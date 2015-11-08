---
layout: post
title: "Note on the Group Theory"
author: Haixing Hu
category: research
use_math: true
tags: [mathematics, abstract algebra, group theory, notes]
---

## Group

Let $G$ be a set, and $\cdot : G \times G \to G$ be a binary operator over $G$. 
$(G, \cdot)$ is called a *group* if the following axioms hold:

- Closure: $\forall a, b \in G, ~ a \cdot b \in G$
- Associativity: $\forall a,b,c \in G,~(a \cdot b) \cdot c = a \cdot (b \cdot c)$
- Identity Element: $\exists e \in G,~\forall a \in G,~a \cdot e = e \cdot a = a$,
  such an element $e$ is unique \(see below\), and it is called the *identity 
  element* of the group.
- Inverse Element: $\forall a \in G,~\exists b \in G,~a \cdot b = b \cdot a = e$, 
  where $e$ is the identity element of the group, and the element $b$ is called 
  the *inverse element* of the element $a$.

<!--more-->

**Note:** 

- The binary operator $\cdot$ of a group $(G, \cdot)$ is sometimes called the
  *multiplication* of the group.
- The commutativity of $\cdot$ may *not* hold for the group. If the commutativity
  of $\cdot$ hold, i.e., $\forall a, b \in G, a \cdot b = b \cdot a$, the group
  $(G, \cdot)$ is called the *abelian group* (in honor of Niels Abel).
- The *closure* and *associativity* ensure that the identity element of the group
  is unique. See below.
- The *closure*, *associativity*, and existence of *identity element* ensure
  that the inverse element of an element in the group is unique. See below.
- Sometimes we denote $a \cdot b$ as $ab$.
- Sometimes we denote the inverse element of $a$ as $a^{-1}$.
- If the inverse element axiom does not hold, $(G, \cdot)$ is called a
  *monoid*.

### Elementary consequences of the group axioms



## Order

- The order of a group $(G, \cdot)$ is the cardinality of $G$.
- The order, sometimes period, of an element $a$ of a group $(G, \cdot)$ is the
  smallest positive integer $m$ such that $a^m = e$, where $e$ is the identity
  element of the group, and $a^m$ denotes the product of $m$ copies of $a$. If
  no such $m$ exists, $a$ is said to have infinite order.

