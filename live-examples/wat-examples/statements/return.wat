(module
  (func (export "get_90") (result i32)
    ;; load 90 onto the stack and return it
    i32.const 90
    return
  )
  (func (export "get_second_value") (param i32 i32) (result i32)
    ;; load both arguments onto the stack
    local.get 0
    local.get 1
    ;; return the second argument; the first is discarded
    return
  )
)
