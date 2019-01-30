// tslint:disable

import * as Lint from 'tslint';
import * as ts from 'typescript';

/**
 * The walker takes care of all the work.
 */
class NoImportsWalker extends Lint.RuleWalker {
  /**
   * Check if the file needs container types
   */
  public visitSourceFile(node: ts.SourceFile) {
    const MapStateType = 'IContainerStateProps';
    const MapDispatchType = 'IContainerDispatchProps';

    const { text } = node;

    /**
     * Does the content have an error
     */
    const hasError = () => {
      if (!text.includes('react-redux')) return false;
      if (!text.includes('connect')) return false;
      if (!text.includes('connect<')) return true;

      if (text.includes('mapState')) {
        if (!text.includes(MapStateType)) return true;
      }

      if (text.includes('mapDispatch')) {
        if (!text.includes(MapDispatchType)) return true;
      }

      return false;
    };

    if (hasError()) {
      this.addFailure(this.createFailure(
        node.getStart(),
        node.getWidth(),
        `\nRedux containers must include\n\nconnect<${MapStateType}, ${MapDispatchType}>(...\n\nIf they map state or dispatch\n`
      ));
    }

    // call the base version of this visitor to actually parse this node
    super.visitSourceFile(node);
  }
}

/**
 * The actual rule
 */
export class Rule extends Lint.Rules.AbstractRule {
  /**
   * Apply the rule
   */
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new NoImportsWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}
