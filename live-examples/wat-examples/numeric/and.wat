(module

  (func (export "and") (param $a i32) (param $b i32) (result i32)
    ;; load both numbers onto the stack
    local.get $a
    local.get $b

    ;; `and` both numbers and return the result
    i32.and
  )

)
