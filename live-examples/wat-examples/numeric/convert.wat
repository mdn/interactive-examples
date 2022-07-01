(module
  (import "console" "log" (func $log (param f32)))
  (func $main

    i32.const 10 ;; push an i32 onto the stack

    f32.convert_i32_s ;; convert from signed i32 to f32

    call $log ;; log the result

  )
  (start $main)
)