(module
  (import "console" "log" (func $log (param f32)))
  (func $main

    f64.const 10.5 ;; push an f64 onto the stack

    f32.demote_f64 ;; demote from f64 to f32

    call $log ;; log the result

  )
  (start $main)
)