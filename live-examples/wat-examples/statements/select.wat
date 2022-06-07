(module
  (import "console" "log" (func $log (param i32)))
  (func $main
    ;; load two values onto the stack
    i32.const 10
    i32.const 20

    ;; change to `1` (true) to get the first value (`10`)
    i32.const 0
    select

    call $log ;; log the selected value
  )
  (start $main)
)