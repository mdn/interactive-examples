(module
  (import "console" "log" (func $log (param f32)))
  (func $main
    ;; load `10` and a negative number onto the stack
    f32.const 10
    f32.const -2

    f32.copysign ;; copy just the sing bit from second to the first number
    call $log ;; log the result
  )
  (start $main)
)
