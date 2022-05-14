(module
  (import "env" "log_bool" (func $log_bool (param i32)))
  (func $main
    ;; load `10` and `2` onto the stack
    i32.const 10
    i32.const 2

    i32.ge_u ;; check if `10` is greater than or equal to '2'
    call $log_bool ;; log the result
  )
  (start $main)
)