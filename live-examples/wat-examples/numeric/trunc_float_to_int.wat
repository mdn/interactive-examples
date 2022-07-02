(module
  (import "console" "log" (func $log (param i32)))
  (func $main

    f32.const 10.5 ;; push an f32 onto the stack

    i32.trunc_f32_s ;; convert from f32 to signed i32 rounding towards zero (.5 will be lost)

    call $log ;; log the result

  )
  (start $main)
)