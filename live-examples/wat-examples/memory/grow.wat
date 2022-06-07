(module
  (import "console" "log" (func $log (param i32)))
  (memory 1 2) ;; start with one memory page, and max of 2 pages
  (func $main

    ;; grow memory by 1 page
    ;; grow returns in 1 for success and -1 for failure
    ;; will fail if you change to more more than 1 page
    (memory.grow (i32.const 1))
    call $log ;; log the result

  )
  (start $main)
)