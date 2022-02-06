(module

  (func (export "rotate_left") (param $num i32) (param $by i32) (result i32)
    ;; load the number to rotate and the by how many spots
    local.get $num
    local.get $by

    ;; rotate and return the result
    i32.rotl
  )

)
