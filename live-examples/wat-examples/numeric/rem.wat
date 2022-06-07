(module
  (import "console" "log" (func $log (param i32)))
  (func $main
    ;; load `10` and `3` onto the stack
    i32.const 10
    i32.const 3

    i32.rem_u ;; calculate the remainder
    call $log ;; log the result
  )
  (start $main)
)