(module
  ;; Import the `greet` function from the environment
  (import "env" "greet" (func $greet))

  (func
    ;; Call the imported `greet` function
    call $greet
  )

  ;; Automatically run the first function when the module starts
  (start 1)
)
