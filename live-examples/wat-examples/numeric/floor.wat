(module
  (import "console" "log" (func $log (param f32)))
  (func $main

    f32.const -2.7 ;; load a number onto the stack
    f32.floor ;; round down
    call $log ;; log the result

  )
  (start $main)
)