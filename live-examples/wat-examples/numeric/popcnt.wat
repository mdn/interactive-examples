(module

  (func (export "count1s") (param $num i32) (result i32)
    ;; load the number onto the stack
    local.get $num

    ;; coount the amount of 1s and return the result
    i32.popcnt
  )

)
