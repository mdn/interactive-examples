(module
  (import "console" "log" (func $log (param i32)))
  (func $main
    ;; the value `10000000_00000000_00000000_00000000` in binary
    ;; maps to `-0` as a floating point and to `-2147483648` as an integer.

    f32.const -0 ;; push an f32 onto the stack

    i32.reinterpret_f32 ;; reinterpret the bytes of the f32 as i32

    call $log ;; log the result
  )
  (start $main)
)