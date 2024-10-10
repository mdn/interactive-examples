(module
  ;; Calculate the factorial of a number
  (func $fac (export "fac") (param $x i64) (result i64)
    ;; Call the `fac-aux` function with $x and 1 parameters
    (return_call $fac-aux (local.get $x) (i64.const 1))
  )

  ;; Perform the factorial calculation
  (func $fac-aux (param $x i64) (param $r i64) (result i64)
    ;; If $x is zero, return the accumulated result $r
    (if (result i64) (i64.eqz (local.get $x))
      (then (return (local.get $r)))
      (else
        ;; Otherwise, recursively call `fac-aux` with $x-1 and $x*$r
        (return_call $fac-aux
          (i64.sub (local.get $x) (i64.const 1))
          (i64.mul (local.get $x) (local.get $r))
        )
      )
    )
  )
)
