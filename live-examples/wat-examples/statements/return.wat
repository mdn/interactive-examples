(module
  (func (export "get_90") (result i32)
    ;; load 10 onto the stack
    i32.const 10
    ;; load 90 onto the stack
    i32.const 90
    ;; return the second value (90); the first is discarded
    return
  )
)
