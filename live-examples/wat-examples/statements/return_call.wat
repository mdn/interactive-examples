(module
  (func $fac (export "fac") (param $x i64) (result i64)
    (return_call $fac-aux (local.get $x) (i64.const 1))
  )

  (func $fac-aux (param $x i64) (param $r i64) (result i64)
    (if (result i64) (i64.eqz (local.get $x))
      (then (return (local.get $r)))
      (else
        (return_call $fac-aux
          (i64.sub (local.get $x) (i64.const 1))
          (i64.mul (local.get $x) (local.get $r))
        )
      )
    )
  )
)
