(module
  (import "console" "log" (func $log (param i32)))
  (global $var i32 (i32.const 10))
  (func $main

    global.get $var ;; load the value of $var variable onto the stack
    call $log ;; log the result

  )
  (start $main)
)