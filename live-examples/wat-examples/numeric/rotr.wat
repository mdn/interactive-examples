(module

  (func (export "rotate_right") (param $num i32) (param $by i32) (result i32)
    ;; load the number to rotate and the by how many spots
    local.get $num
    local.get $by

    ;; rotate and return the result
    i32.rotr
  )

)
