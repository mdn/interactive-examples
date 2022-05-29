(module
  (import "console" "log" (func $log (param i32)))
  
  ;; import a global variable from js
  (global $from_js (import "env" "from_js") i32)

  ;; create a global variable
  (global $from_wasm i32 (i32.const 10))

  (func $main
    ;; load both global variables onto the stack
    global.get $from_js
    global.get $from_wasm

    i32.add ;; add up both globals
    call $log ;; log the result
  )
  (start $main)
)
