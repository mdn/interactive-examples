(module
  (import "console" "log" (func $log (param i32)))
  (func $main

    (local $var i32) ;; create a local variable named $var
    (i32.const 10) ;; load `10` onto the stack
    local.tee $var ;; set the $var to `10` and keep `10` on the stack
    call $log ;; log the top item on the stack (10)

  )
  (start $main)
)