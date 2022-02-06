(module

  (func (export "trailing0") (param $num i32) (result i32)
    ;; load  number onto the stack
    local.get $num

    ;; check how many trailing zeros and return the result
    i32.ctz
  )

)
