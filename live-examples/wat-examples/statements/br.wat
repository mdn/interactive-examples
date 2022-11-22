(module
  ;; import the browser console object, you'll need to pass this in from JavaScript
  (import "console" "log" (func $log (param i32)))

  ;; create a global variable and initialize it to 0
  (global $i (mut i32) (i32.const 0))

  (func
    (loop $my_loop

      ;; add one to $i
      global.get $i
      i32.const 1
      i32.add
      global.set $i

      ;; log the current value of $i
      global.get $i
      call $log

      ;; if $i is less than 10 branch to loop
      global.get $i
      i32.const 10
      i32.lt_s
      br_if $my_loop

    )
  )

  (start 1) ;; run the first function automatically
)
