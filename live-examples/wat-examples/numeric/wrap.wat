(module
  (import "console" "log" (func $log (param i32)))
  (func $main

    i64.const 10 ;; push an i64 onto the stack

    i32.wrap_i64 ;; wrap from i64 to i32

    call $log ;; log the result
  )
  (start $main)
)
