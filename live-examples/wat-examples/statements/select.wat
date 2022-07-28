(module
  (func (export "select_10_or_20") (result i32)
    ;; load two values onto the stack
    i32.const 10
    i32.const 20

    ;; change to `1` (true) to get the first value (`10`)
    i32.const 0
    select
  )
  (func (export "select_value_if_zero") (param $value externref) (param $condition i32) (result i32)
    ;; this is "select t", the explicitly typed variant
    ref.null extern
    local.get $value
    local.get $condition
    select (result externref)
  )
)
