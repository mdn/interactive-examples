(module
  (import "console" "log" (func $log (param i64)))
  (func $main

    i32.const 10 ;; push an i32 onto the stack

    i64.extend_i32_s ;; sign-extend from i32 to i64

    call $log ;; log the result

  )
  (start $main)
)
