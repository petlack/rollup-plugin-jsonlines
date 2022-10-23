import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'rollup';

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;

interface RollupJsonlOptions {
  /**
   * A picomatch pattern, or array of patterns, which specifies the files in the build the plugin
   * should operate on.
   * By default all files are targeted.
   */
  include?: FilterPattern;
  /**
   * A picomatch pattern, or array of patterns, which specifies the files in the build the plugin
   * should _ignore_.
   * By default no files are ignored.
   */
  exclude?: FilterPattern;
  /**
   * Specifies a function which processes each row in the parsed array.
   * The function can either manipulate the passed row, or return an entirely new row object.
   * @default undefined
   */
  processRow?: null | ((row: JSONValue, id: string) => JSONValue | undefined);

  /**
   * If set to false (default), an exception will be thrown in case of invalid JSON on a line.
   * If set to true, invalid lines will be omitted.
   * @default false
   */
  ignoreErrors?: boolean;
}

/**
 * Import `jsonl` (JSON lines) files as JSON array.
 */
export default function jsonl(options?: RollupJsonlOptions): Plugin;
