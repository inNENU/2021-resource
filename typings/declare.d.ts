declare module "qrcode" {
  export interface QRCodeSegment {
    data: string;
    mode: "alphanumeric" | "numeric" | "kanji" | "byte";
  }

  export type QRCodeErrorCorrectionLevel =
    | "low"
    | "medium"
    | "quartile"
    | "high"
    | "L"
    | "M"
    | "Q"
    | "H";

  export interface QRCodeOptions {
    /** QR Code version. If not specified the more suitable value will be calculated. */
    version?: number;
    /**
     * Error correction level.
     * Possible values are low, medium, quartile, high or L, M, Q, H.
     * Default: M
     */
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    /**
     * Helper function used internally to convert a kanji to its Shift JIS value.
     * Provide this function if you need support for Kanji mode.
     */
    toSJISFunc?: (codePoint: string) => number;
  }

  export interface QRCodeRenderersOptions extends QRCodeOptions {
    /**
     * Define how much wide the quiet zone should be.
     * Default: 4
     */
    margin?: number;
    /**
     * Scale factor. A value of 1 means 1px per modules (black dots).
     * Default: 4
     */
    scale?: number;
    /**
     * Forces a specific width for the output image.
     * If width is too small to contain the qr symbol, this option will be ignored.
     * Takes precedence over scale.
     */
    width?: number;
    color?: {
      /**
       * Color of dark module. Value must be in hex format (RGBA).
       * Note: dark color should always be darker than color.light.
       * Default: #000000ff
       */
      dark?: string;
      /**
       * Color of light module. Value must be in hex format (RGBA).
       * Default: #ffffffff
       */
      light?: string;
    };
  }

  export interface QRCodeToFileOptions extends QRCodeRenderersOptions {
    /**
     * Output format.
     * Default: png
     */
    type?: "png" | "svg" | "utf8";
    rendererOpts?: {
      /**
       * Compression level for deflate.
       * Default: 9
       */
      deflateLevel?: number;
      /**
       * Compression strategy for deflate.
       * Default: 3
       */
      deflateStrategy?: number;
    };
  }

  /**
   * Saves QR Code to image file.
   * If options.type is not specified, the format will be guessed from file extension.
   * Recognized extensions are png, svg, txt.
   */
  export function toFile(
    path: string,
    text: string | QRCodeSegment[],
    options?: QRCodeToFileOptions
  ): Promise<any>;
}
