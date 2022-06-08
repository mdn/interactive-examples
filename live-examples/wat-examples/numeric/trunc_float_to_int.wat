(module
  (import "console" "log" (func $log (param i32)))
  (func $main

    f32.const 10.5 ;; push an i32 onto the stack

    i32.trunc_f32_s ;; convert from signed f32 to i32 (.5 will be lost)

    call $log ;; log the result

  )
  (start $main)
)