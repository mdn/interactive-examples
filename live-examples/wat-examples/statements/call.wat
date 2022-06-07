(module
  (import "env" "greet" (func $greet))

  (func
    ;; call the greet function
    call $greet
  )

  (start 1) ;; run the first function automatically
)
