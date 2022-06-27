(module
  (import "console" "log" (func $log (param f64)))
  (func $main

    f32.const 10.5 ;; push an f32 onto the stack

    f64.promote_f32 ;; promote from f32 to f64

    call $log ;; log the result

  )
  (start $main)
)