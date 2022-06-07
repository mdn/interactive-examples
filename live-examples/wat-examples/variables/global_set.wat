(module
  (import "console" "log" (func $log (param i32)))
  (global $var (mut i32) (i32.const 0))
  (func $main
    i32.const 10 ;; load a number onto the stack
    global.set $var ;; set the $var

    global.get $var ;; load $var onto the stack
    call $log ;; log the result
  )
  (start $main)
)