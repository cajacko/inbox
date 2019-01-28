const {
  runCommand,
  CertStorage,
  replaceInFile,
} = require('@cajacko/template-utils');
const { join } = require('path');
const { remove, writeFile } = require('fs-extra');

/**
 * Get the android keys from cert storage
 */
const getAndroidKeys = certStorage => certStorage.get();

/**
 * Generate the Android keystore file
 */
const generateAndroidKeys = (keyStorePath, keyStorePassword, alias, bundleID) =>
  runCommand(
    `keytool -genkey -v -storepass ${keyStorePassword} -keypass ${keyStorePassword} -keystore ${keyStorePath} -alias ${alias} -keyalg RSA -keysize 2048 -validity 10000 -dname CN=${bundleID},OU=,O=,L=,S=,C=US`
  );

/**
 * Check if the android keys exist, if not create them. And put them in the
 * right places
 */
const ensureAndroidKeys = (certStorage, tmpDir, bundleID, { resetKeys }) => {
  const sentryAndroid = join(tmpDir, 'android/sentry.properties');
  const sentryIos = join(tmpDir, 'ios/sentry.properties');
  const keyStorePath = join(tmpDir, 'android/app/my-release-key.keystore');
  const gradleProperties = join(tmpDir, 'android/gradle.properties');
  const googleServicesAndroidPath = join(
    tmpDir,
    'android/app/google-services.json'
  );
  const googleServicesIos = join(tmpDir, 'ios/GoogleService-Info.plist');

  return remove(keyStorePath)
    .then(() => (resetKeys ? null : getAndroidKeys(certStorage)))
    .then(keys => {
      if (keys.keystore) return keys;

      const keyStorePassword = Math.random()
        .toString(36)
        .slice(-8);
      const alias = 'my-key-alias';

      return generateAndroidKeys(
        keyStorePath,
        keyStorePassword,
        alias,
        bundleID
      )
        .then(() =>
          certStorage.add(
            {
              title: 'Android Keystore File',
              key: 'keystore',
              filePath: keyStorePath,
            },
            {
              title: 'Android Keystore Password',
              key: 'keystore-password',
              value: keyStorePassword,
            },
            {
              title: 'Android Keystore Alias',
              key: 'keystore-alias',
              value: alias,
            }
          )
        )
        .then(() => certStorage.commit({ preventDelete: true }))
        .then(() => getAndroidKeys(certStorage));
    })
    .then(data => {
      if (!data) throw new Error('Could not set the android keys');

      return Promise.all([
        writeFile(keyStorePath, data.keystore),
        writeFile(googleServicesAndroidPath, data.googleServicesAndroid),
        writeFile(googleServicesIos, data.googleServicesIos),
        writeFile(gradleProperties, data.gradleProperties),
        writeFile(sentryAndroid, data.sentryAndroid),
        writeFile(sentryIos, data.sentryIos),
        replaceInFile(
          join(tmpDir, 'android/gradle.properties'),
          {
            regex: /=TEMPLATE_RELEASE_STORE_PASSWORD/,
            replacement: `=${data['keystore-password']}`,
          },
          {
            regex: /=TEMPLATE_RELEASE_KEY_PASSWORD/,
            replacement: `=${data['keystore-password']}`,
          },
          {
            regex: /=TEMPLATE_RELEASE_KEY_ALIAS/,
            replacement: `=${data['keystore-alias']}`,
          }
        ),
      ]);
    });
};

/**
 * Stub for when we do this
 */
const ensureIOSKeys = () => Promise.resolve();

/**
 * Ensure all the signing keys and auth exist for the specified platforms
 * (defaults to all platforms)
 */
exports.ensureAppKeys = ({
  ios,
  android,
  certStorage,
  tmpDir,
  resetKeys,
  bundleID,
}) => {
  const promises = [];

  const addAndroid = !promises.length || android;
  const addIOS = !promises.length || ios;

  if (addIOS) promises.push(() => ensureIOSKeys());
  if (addAndroid) {
    promises.push(() =>
      ensureAndroidKeys(certStorage, tmpDir, bundleID, { resetKeys })
    );
  }

  /**
   * Loop through each promise
   */
  const loop = (i = 0) => {
    const promise = promises[i];

    if (!promise) return Promise.resolve();

    return promise().then(() => loop(i + 1));
  };

  return loop();
};
