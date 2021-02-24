/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />
declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    content?: string;
  }
}
