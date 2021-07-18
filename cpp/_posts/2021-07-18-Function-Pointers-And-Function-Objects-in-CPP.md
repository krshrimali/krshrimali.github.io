---
layout: post
title: "Function Pointers and Function Objects in C++"
date: 2021-07-18
desc: "Understanding Function Pointers and Objects in C++"
keywords: "Blog, C++, Functors, Function Objects, Pointers, Function Pointers"
categories: [Blog, C++]
tags: [Blog, C++]
blog: [C++]
published: true
excerpt_separator: <!--more-->
images:
  - url: /assets/blogs/cpp/fptr_fobj_cover.png
icon: icon-html
---

In today's blog, we'll talk about two important concepts in C++: Function Pointers and Function Objects.

Please note that, function objects are commonly referred as _functors_ but we have failed to notice any official alias to the name. Hence, we'll restrict ourselves to using _Function Objects_ in this blog.

## Function Pointers

As the name sounds, a function pointer is simply a pointer to the memory address of a function. Consider a following function:

```cpp
// A function which returns true if a > b else false
bool isGreater(int a, int b) {
	return a > b;
}
```

As we would expect, the function is stored in the memory starting with an address. You can print the memory address of a function by doing (we do this using `printf`, see: https://stackoverflow.com/a/2064722)

```cpp
auto fn_addresss = isGreater; // get the address of the function
printf("Function address: %p\n", fn_address);
```

And you'll notice a hex value as the output: `0x5649d675c139` (in my case). The syntax for creating a function pointer looks like this:

```cpp
return_type (*ptr_name)(arg1_type, arg2_type, ...);
```

So in our case for `isGreater`, it will be:

```cpp
bool (*justApointer)(int, int);
```

What this means is, the pointer _justApointer_ will point to a function taking 2 integer arguments and returning a boolean value. But note that this doesn't point to any function yet. If you will do:

```cpp
bool (*justApointer)(int, int);
// De-reference the pointer and call 
(*justApointer)(3, 4);
```

This will cause a `segmentation fault (core dumped)` error because it points to no valid address of an executable code. So let's go ahead and point our pointer to the memory address of `isGreater`:

```cpp
justApointer = &isGreater;
```

Here we have given the address of the function to the pointer, you can also do:

```cpp
// Note: It's a good practice to avoid writing the type of function pointers again if it's too verbose
using FnType = bool (*)(int, int);
FnType justApointer{ &isGreater }; // OK
FnType yetAnotherPointer = &isGreater; // OK
FnType yetAnotherFnPointer = isGreater; // OK, implicit conversion happens in C++ from function to function pointer, so you don't need to use & operator
```

You could also have declared the pointer first, and then initialized:

```cpp
// Declararation
bool (*justApointer)(int, int);

// Initialization
justApointer { &isGreater };
justApointer { isGreater };
justApointer = &isGreater;
justApointer = isGreater;
```

All of this is valid and works in C++. If you're coming from Modern C++, you might have realized that it's OK to skip the syntax of a function pointer and use:

```cpp
auto justApointer = isGreater;
```

Calling a function pointer is fairly straight forward, you can just do:

```cpp
// Will return 0 since 3 is not greater than 4
std::cout << (*justApointer)(3, 4);
```

Since it's a pointer, so you have to de-reference it to get to the function address (executable code in the memory) and then call it using the `()` call operator. C++ does the implicit conversion, and you can skip de-referencing:

```cpp
// Will also return 0 since 3 is not greater than 4
std::cout << justApointer(3, 4);
```

If you are familiar with concepts of `const` pointers, you can also create a _const_ function pointer, so that once initialized - it can not be pointed to a different function.

```cpp
bool (*const justApointer)(int, int) = &isGreater;

// You can not re-initialize (aka assign) it to point to any other address
justApointer = &isGreater; // NOT OK, ERROR: assignment of read-only variable 'justApointer'
```

If you have noticed, we used `*const justApointer` - since we wanted to indicate to the compiler - that the pointer is supposed to be `const`, not the output (`const bool (*justApointer)(int, int)`). You can play around with different specifiers and see how they work though.

One of the use-cases of function pointers is to be able to pass a function as an argument (often referred as **Callback Functions**). But well, you might have a question - you can use a global function in another function, right? Yes, that's possible, but consider a case where you want to pass different callback functions depending on your requirement to a more generic function (like sorting).

```cpp
bool isGreater(int a, int b) { return a > b; }
bool isLesser(int a, int b) { return a < b; }
bool isEqual(int a, int b) { return a == b; }
```

We have these 3 functions but we don't know yet which one we want to use to sort an array, let's say you want to sort an array in descending order, another array in ascending order.

```cpp
std::vector<int> sample_vec = {0, 5, -3, 4, 9, 2};

void a_generic_sorting_function(std::vector<int> input_vec, bool (*comparisonFunction)(int, int)) {
	// ... sorting algorithm
	// use comparisonFunction for comparisons
}

a_generic_sorting_function(sample_vec, isGreater); // sorts in descending order
a_generic_sorting_function(sample_vec, isLesser); // sorts in ascending order
```

Observe that even though we passed a function as an argument, but eventually - that's interpreted as a pointer (since that's what the 3rd argument type is, in `a_generic_sorting_function`).

## Function Objects

> Function Objects are types that implement call operator ().

Function Objects provide us 2 advantages over function pointers, which are mainly:

1. Can be optimized by the compiler, if possible.
2. Allows to store a state.

### How can compiler optimize function objects?

You'll see this definition almost everywhere, and hence the quote. There is no better and simpler way to define a function object. But we'll also focus on how can they make things easier + faster. A `struct` or a `class` in C++ which defines/implements call operator `()` can be referred as function object. Interestingly, in C++:

* `std::plus` is a **function object** implementing `x + y`.
* `std::minus` is a **function object** implementing `x - y`.

and many more arithmetic operators like `/, *, %` and negation (`-x`). See _Operator Function Objects_ section in https://en.cppreference.com/w/cpp/utility/functional.

There are other comparison, logical and bitwise operations as well which are provided as function objects in C++. Let's take a look at `std::greater` and `std::lesser` function objects to maintain the consistency b/w function pointers and objects sections. Going by the documentation (https://en.cppreference.com/w/cpp/utility/functional/greater), the struct `std::greater` implements the call operator `()`:

```cpp
bool operator() (const T& lhs, const T& rhs) const; // (until C++14)
```
(source: https://en.cppreference.com/w/cpp/utility/functional/greater)

If we had to define our own function object, something similar to `std::greater` but only for integer inputs. As mentioned earlier, it's a type with the call operator defined, so let's go ahead and define our own `struct`:

```cpp
struct greater {
    bool operator()(int a, int b) {
        return a > b;
    }
};

greater comparison;
std::cout << comparison(3, 4);  // Returns 0
```

Now you can ask: this could have been accomplished with a function pointer as well, so why a function object? Well, so the answer boils down to optimization (in this case). A compiler can inline the function if it's possible to optimize the execution - and that's only possible with function objects, while for function pointers - you need to de-reference it to know the address which happens during the runtime (unless there is some real complex optimization - which I'm not aware of right now).

A real example can be to see the compiled code on https://godbolt.org/ (an amazing compiler explorer). If I compile the following code (on x86-64, gcc 11.1 with no optimization flags):

```cpp
#include <iostream>

struct greater {
    bool operator()(int a, int b) {
        return a > b;
    }
};

int main() {
    struct greater obj;
    std::cout << obj(3, 4);
}
```

The relevant assembly code of the `main` function looks like this:

```cpp
main:
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        lea     rax, [rbp-1]
        mov     edx, 4
        mov     esi, 3
        mov     rdi, rax
        call    greater::operator()(int, int)
        movzx   eax, al
        mov     esi, eax
        mov     edi, OFFSET FLAT:_ZSt4cout
        call    std::basic_ostream<char, std::char_traits<char> >::operator<<(bool)
        mov     eax, 0
        leave
        ret
```

The above assembly code may look overwhelming to some, but the most relevant instruction is: (link to the code: https://godbolt.org/z/WqYozn7qv)

```cpp
call    greater::operator(int, int)
```

Now if I add the optimization flag, you'll see the operator being inlined:

```cpp
main:
        sub     rsp, 8
        xor     esi, esi
        mov     edi, OFFSET FLAT:_ZSt4cout
        call    std::basic_ostream<char, std::char_traits<char> >& std::basic_ostream<char, std::char_traits<char> >::_M_insert<bool>(bool)
        xor     eax, eax
        add     rsp, 8
        ret
_GLOBAL__sub_I_main:
        sub     rsp, 8
        mov     edi, OFFSET FLAT:_ZStL8__ioinit
        call    std::ios_base::Init::Init() [complete object constructor]
        mov     edx, OFFSET FLAT:__dso_handle
        mov     esi, OFFSET FLAT:_ZStL8__ioinit
        mov     edi, OFFSET FLAT:_ZNSt8ios_base4InitD1Ev
        add     rsp, 8
        jmp     __cxa_atexit
```

Though, it may not be visible on the first look, but a closer look to the following instruction:

```cpp
call    std::basic_ostream<char, std::char_traits<char> >& std::basic_ostream<char, std::char_traits<char> >::_M_insert<bool>(bool)
```

tells us that it doesn't call the operator of the object of type `greater` anymore! Instead, the compiler knows that the value is `false` and hence it inlines the value to the `std::cout` call. While this is possible for function objects, it's not possible for function pointers (with the `-O3` flag at least).

### Storing a state

It's more like a property of a class/struct in C++ that you can take arguments in the constructor and have different objects with different values for a member variable. Take an example:

```cpp
// Usage:
// GreaterThan obj(10);
// obj(11); // is 11 > 10?
//
// GreaterThan obj_(-10);
// obj_(-9); // is -9 > -10?
class GreaterThan {
    int compare_with;
public:
    void greaterThan(int inp) : compare_with(inp) { }
    bool operator()(int another_number) { return another_number > compare_with; }
};

int main() {
    GreaterThan obj(10);
    std::cout << obj(11) << '\n';

    GreaterThan obj_(-10);
    std::cout << obj_(-9) << '\n';
}
```

Here you have a member variable `compare_with` and you can have different values for each object instantiated. While it's also possible for a function by using a `static` variable but you can't have multiple values for it on a single run.

## Function Objects and Function Pointers in the Standard Library

Function Objects and Function Pointers, just like any other type/value can be passed as a type to a template:

```cpp
template <typename T, typename ComparatorFunc>
void sort(T vector_input, ComparatorFunc func) {
    // ... sorting logic using given comparator function: func
}
```

This allows you to use `sort` as a generic function with different types of comparators. Let's take a look here, you have 2 function object types: `isGreater` and `isLesser`: (the same can be done for function pointers as well)

```cpp
struct isGreater {
    bool operator()(int a, int b) { return a > b; }
}

struct isLesser {
    bool operator()(int a, int b) { return a < b; }
}

template <typename T, typename ComparatorFunc>
T sort(T input, ComparatorFunc func) {
    // use func to decide sorting strategy (descending/ascending)
}
```

This is valid in C++, though I'll like to add a disclaimer here, you could have just used `std::sort` instead of implementing your own sorting strategy (unless you know what you are doing ;)):

```cpp
std::sort(input.begin(), input.end(), isGreater);
std::sort(input.begin(), input.end(), isLesser);
```

This is mostly it for this blog, there is a lot to discuss about function pointers and objects, but I guess this should be enough for you to get started and follow us along in future blogs.

## Acknowledgement

Every blog is published after lots of reviews and corrections, and it's not just me but the efforts of the whole team which should be acknowledged. Thanks to <a href="https://github.com/kshitij12345">Kshitij Kalambarkar</a> for helping me with the reviews and corrections. Shoutout to the whole malloc(42) team for helping me with this.

## References and Good Reads

1. <a href="https://www.learncpp.com/cpp-tutorial/function-pointers/">Learn CPP's Blog on Function Pointer</a>.
2. <a href="https://docs.microsoft.com/en-us/cpp/standard-library/function-objects-in-the-stl">Function Objects in the STL (Microsoft Docs)</a>
3. <a href="https://en.cppreference.com/w/cpp/utility/functional">CppReference: Function Objects</a>.
