(module
  (import "console" "log" (func $log (param i32)))
  (memory 2)
  (func $main

    memory.size ;; get the memory size
    call $log ;; log the result

  )
  (start $main)
)