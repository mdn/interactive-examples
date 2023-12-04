(module
  (import "console" "log" (func $log (param f32)))
  (func $main
    ;; load `10` and `2` onto the stack
    f32.const 10
    f32.const 2

    f32.min ;; calculate the lower number
    call $log ;; log the result
  )
  (start $main)
)
