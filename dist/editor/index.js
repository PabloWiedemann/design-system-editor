// @__NO_SIDE_EFFECTS__
function Ll(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Be = {}, ds = [], fs = () => {
}, Bd = () => !1, Yr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Xr = (e) => e.startsWith("onUpdate:"), zt = Object.assign, Nd = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, mm = Object.prototype.hasOwnProperty, Ve = (e, t) => mm.call(e, t), be = Array.isArray, zn = (e) => Lo(e) === "[object Map]", wr = (e) => Lo(e) === "[object Set]", Ha = (e) => Lo(e) === "[object Date]", De = (e) => typeof e == "function", Ze = (e) => typeof e == "string", Mt = (e) => typeof e == "symbol", je = (e) => e !== null && typeof e == "object", Vd = (e) => (je(e) || De(e)) && De(e.then) && De(e.catch), Ld = Object.prototype.toString, Lo = (e) => Ld.call(e), hm = (e) => Lo(e).slice(8, -1), zd = (e) => Lo(e) === "[object Object]", Jr = (e) => Ze(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, vo = /* @__PURE__ */ Ll(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Zr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, gm = /-\w/g, pt = Zr(
  (e) => e.replace(gm, (t) => t.slice(1).toUpperCase())
), vm = /\B([A-Z])/g, On = Zr(
  (e) => e.replace(vm, "-$1").toLowerCase()
), Qr = Zr((e) => e.charAt(0).toUpperCase() + e.slice(1)), yo = Zr(
  (e) => e ? `on${Qr(e)}` : ""
), ft = (e, t) => !Object.is(e, t), vr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, jd = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, zl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ua;
const ei = () => Ua || (Ua = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ie(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = Ze(s) ? wm(s) : Ie(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (Ze(e) || je(e))
    return e;
}
const ym = /;(?![^(]*\))/g, bm = /:([^]+)/, xm = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function wm(e) {
  const t = {};
  return e.replace(xm, (n) => n.startsWith("/*") ? "" : n).split(ym).forEach((n) => {
    if (n) {
      const s = n.split(bm);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ee(e) {
  let t = "";
  if (Ze(e))
    t = e;
  else if (be(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ee(e[n]);
      s && (t += s + " ");
    }
  else if (je(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Nt(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ze(t) && (e.class = Ee(t)), n && (e.style = Ie(n)), e;
}
const km = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", _m = /* @__PURE__ */ Ll(km);
function Kd(e) {
  return !!e || e === "";
}
function Cm(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let o = 0; s && o < e.length; o++)
    s = ti(e[o], t[o], n);
  return s;
}
function Wa(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), o = new Uint8Array(s.length);
  for (const r of e) {
    let i = -1;
    for (let l = 0; l < s.length; l++)
      if (!o[l] && ti(r, s[l], n)) {
        i = l;
        break;
      }
    if (i < 0) return !1;
    o[i] = 1;
  }
  return !0;
}
function Sm(e, t, n) {
  let s = zn(e), o = zn(t);
  if (s || o || (s = wr(e), o = wr(t), s || o))
    return s && o ? Wa(e, t, n) : !1;
  const r = Object.keys(e).length, i = Object.keys(t).length;
  if (r !== i)
    return !1;
  for (const l in e) {
    const u = e.hasOwnProperty(l), d = t.hasOwnProperty(l);
    if (u && !d || !u && d || !ti(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function Ga(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [o, r] = n;
  if (o.has(e) || r.has(t))
    return o.get(e) === t && r.get(t) === e;
  o.set(e, t), r.set(t, e);
  const i = s(e, t, n);
  return o.delete(e), r.delete(t), i;
}
function ti(e, t, n) {
  if (e === t) return !0;
  let s = Ha(e), o = Ha(t);
  return s || o ? s && o ? e.getTime() === t.getTime() : !1 : (s = Mt(e), o = Mt(t), s || o ? e === t : (s = be(e), o = be(t), s || o ? s && o ? Ga(e, t, n, Cm) : !1 : (s = je(e), o = je(t), s || o ? !s || !o ? !1 : Ga(e, t, n, Sm) : String(e) === String(t))));
}
const Hd = (e) => !!(e && e.__v_isRef === !0), R = (e) => Ze(e) ? e : e == null ? "" : be(e) || je(e) && (e.toString === Ld || !De(e.toString)) ? Hd(e) ? R(e.value) : JSON.stringify(e, Ud, 2) : String(e), Ud = (e, t) => Hd(t) ? Ud(e, t.value) : zn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, o], r) => (n[Oi(s, r) + " =>"] = o, n),
    {}
  )
} : wr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Oi(n))
} : Mt(t) ? Oi(t) : je(t) && !be(t) && !zd(t) ? String(t) : t, Oi = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Mt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let ct;
class Wd {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ct && (ct.active ? (this.parent = ct, this.index = (ct.scopes || (ct.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const o = this.scopes.slice();
        for (t = 0, n = o.length; t < n; t++)
          o[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ct;
      try {
        return ct = this, t();
      } finally {
        ct = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ct, ct = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ct === this)
        ct = this.prevScope;
      else {
        let t = ct;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const o = this.scopes.slice();
        for (n = 0, s = o.length; n < s; n++)
          o[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Gd(e) {
  return new Wd(e);
}
function jl() {
  return ct;
}
function ni(e, t = !1) {
  ct && ct.cleanups.push(e);
}
let ze;
const Mi = /* @__PURE__ */ new WeakSet();
class Yd {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ct && (ct.active ? ct.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Mi.has(this) && (Mi.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Jd(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ya(this), Zd(this);
    const t = ze, n = Wt;
    ze = this, Wt = !0;
    try {
      return this.fn();
    } finally {
      Qd(this), ze = t, Wt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ul(t);
      this.deps = this.depsTail = void 0, Ya(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Mi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    il(this) && this.run();
  }
  get dirty() {
    return il(this);
  }
}
let Xd = 0, bo, xo;
function Jd(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = xo, xo = e;
    return;
  }
  e.next = bo, bo = e;
}
function Kl() {
  Xd++;
}
function Hl() {
  if (--Xd > 0)
    return;
  if (xo) {
    let t = xo;
    for (xo = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; bo; ) {
    let t = bo;
    for (bo = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Zd(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Qd(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), Ul(s), $m(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  e.deps = t, e.depsTail = n;
}
function il(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ec(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ec(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === To) || (e.globalVersion = To, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !il(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ze, s = Wt;
  ze = e, Wt = !0;
  try {
    Zd(e);
    const o = e.fn(e._value);
    (t.version === 0 || ft(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ze = n, Wt = s, Qd(e), e.flags &= -3;
  }
}
function Ul(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: o } = e;
  if (s && (s.nextSub = o, e.prevSub = void 0), o && (o.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Ul(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function $m(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Wt = !0;
const tc = [];
function Tn() {
  tc.push(Wt), Wt = !1;
}
function An() {
  const e = tc.pop();
  Wt = e === void 0 ? !0 : e;
}
function Ya(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ze;
    ze = void 0;
    try {
      t();
    } finally {
      ze = n;
    }
  }
}
let To = 0;
class Em {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class si {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ze || !Wt || ze === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ze)
      n = this.activeLink = new Em(ze, this), ze.deps ? (n.prevDep = ze.depsTail, ze.depsTail.nextDep = n, ze.depsTail = n) : ze.deps = ze.depsTail = n, nc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ze.depsTail, n.nextDep = void 0, ze.depsTail.nextDep = n, ze.depsTail = n, ze.deps === n && (ze.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, To++, this.notify(t);
  }
  notify(t) {
    Kl();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Hl();
    }
  }
}
function nc(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        nc(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const kr = /* @__PURE__ */ new WeakMap(), ps = /* @__PURE__ */ Symbol(
  ""
), ll = /* @__PURE__ */ Symbol(
  ""
), Ao = /* @__PURE__ */ Symbol(
  ""
);
function vt(e, t, n) {
  if (Wt && ze) {
    let s = kr.get(e);
    s || kr.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new si()), o.map = s, o.key = n), o.track();
  }
}
function kn(e, t, n, s, o, r) {
  const i = kr.get(e);
  if (!i) {
    To++;
    return;
  }
  const l = (u) => {
    u && u.trigger();
  };
  if (Kl(), t === "clear")
    i.forEach(l);
  else {
    const u = be(e), d = u && Jr(n);
    if (u && n === "length") {
      const c = Number(s);
      i.forEach((f, m) => {
        (m === "length" || m === Ao || !Mt(m) && m >= c) && l(f);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(Ao)), t) {
        case "add":
          u ? d && l(i.get("length")) : (l(i.get(ps)), zn(e) && l(i.get(ll)));
          break;
        case "delete":
          u || (l(i.get(ps)), zn(e) && l(i.get(ll)));
          break;
        case "set":
          zn(e) && l(i.get(ps));
          break;
      }
  }
  Hl();
}
function Tm(e, t) {
  const n = kr.get(e);
  return n && n.get(t);
}
function Ts(e) {
  const t = /* @__PURE__ */ Re(e);
  return t === e || (vt(t, "iterate", Ao), /* @__PURE__ */ Ot(e)) ? t : /* @__PURE__ */ un(e) ? /* @__PURE__ */ jn(e) ? t.map((n) => Yn(Lt(n))) : t.map(Yn) : t.map(Lt);
}
function oi(e) {
  return vt(e = /* @__PURE__ */ Re(e), "iterate", Ao), e;
}
function nn(e, t) {
  return /* @__PURE__ */ un(e) ? Yn(/* @__PURE__ */ jn(e) ? Lt(t) : t) : Lt(t);
}
const Am = {
  __proto__: null,
  [Symbol.iterator]() {
    return qi(this, Symbol.iterator, (e) => nn(this, e));
  },
  concat(...e) {
    return Ts(this).concat(
      ...e.map((t) => be(t) ? Ts(t) : t)
    );
  },
  entries() {
    return qi(this, "entries", (e) => (e[1] = nn(this, e[1]), e));
  },
  every(e, t) {
    return vn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return vn(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => nn(this, s)),
      arguments
    );
  },
  find(e, t) {
    return vn(
      this,
      "find",
      e,
      t,
      (n) => nn(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return vn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return vn(
      this,
      "findLast",
      e,
      t,
      (n) => nn(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return vn(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return vn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ii(this, "includes", e);
  },
  indexOf(...e) {
    return Ii(this, "indexOf", e);
  },
  join(e) {
    return Ts(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ii(this, "lastIndexOf", e);
  },
  map(e, t) {
    return vn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return no(this, "pop");
  },
  push(...e) {
    return no(this, "push", e);
  },
  reduce(e, ...t) {
    return Ja(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ja(this, "reduceRight", e, t);
  },
  shift() {
    return no(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return vn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return no(this, "splice", e);
  },
  toReversed() {
    return Ts(this).toReversed();
  },
  toSorted(e) {
    return Ts(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ts(this).toSpliced(...e);
  },
  unshift(...e) {
    return no(this, "unshift", e);
  },
  values() {
    return qi(this, "values", (e) => nn(this, e));
  }
};
function qi(e, t, n) {
  const s = oi(e), o = s[t], r = o.call(s);
  if (s !== e && !/* @__PURE__ */ Ot(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const i = Object.create(Object.getPrototypeOf(r));
      return i.next = () => Xa(r.next(), n), o !== sc[t] && Object.defineProperties(i, {
        return: {
          get() {
            const l = r.return;
            return typeof l == "function" ? l.bind(r) : l;
          }
        },
        throw: {
          get() {
            const l = r.throw;
            return typeof l == "function" ? l.bind(r) : l;
          }
        }
      }), i;
    }
    r._next = r.next, r.next = () => Xa(r._next(), n);
  }
  return r;
}
function Xa(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const sc = Array.prototype;
function vn(e, t, n, s, o, r) {
  const i = oi(e), l = i !== e && !/* @__PURE__ */ Ot(e), u = i[t];
  if (u !== sc[t]) {
    const f = u.apply(e, r);
    return l ? Lt(f) : f;
  }
  let d = n;
  i !== e && (l ? d = function(f, m) {
    return n.call(this, nn(e, f), m, e);
  } : n.length > 2 && (d = function(f, m) {
    return n.call(this, f, m, e);
  }));
  const c = u.call(i, d, s);
  return l && o ? o(c) : c;
}
function Ja(e, t, n, s) {
  const o = oi(e), r = o !== e && !/* @__PURE__ */ Ot(e);
  let i = n, l = !1;
  o !== e && (r ? (l = s.length === 0, i = function(d, c, f) {
    return l && (l = !1, d = nn(e, d)), n.call(this, d, nn(e, c), f, e);
  }) : n.length > 3 && (i = function(d, c, f) {
    return n.call(this, d, c, f, e);
  }));
  const u = o[t](i, ...s);
  return l ? nn(e, u) : u;
}
function Ii(e, t, n) {
  const s = /* @__PURE__ */ Re(e);
  vt(s, "iterate", Ao);
  const o = s[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ li(n[0]) ? (n[0] = /* @__PURE__ */ Re(n[0]), s[t](...n)) : o;
}
function no(e, t, n = []) {
  Tn(), Kl();
  const s = (/* @__PURE__ */ Re(e))[t].apply(e, n);
  return Hl(), An(), s;
}
const Pm = /* @__PURE__ */ Ll("__proto__,__v_isRef,__isVue"), oc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Mt)
);
function Om(e) {
  Mt(e) || (e = String(e));
  const t = /* @__PURE__ */ Re(this);
  return vt(t, "has", e), t.hasOwnProperty(e);
}
class rc {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (o ? r ? cc : dc : r ? uc : ac).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = be(t);
    if (!o) {
      let u;
      if (i && (u = Am[n]))
        return u;
      if (n === "hasOwnProperty")
        return Om;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ et(t) ? t : s
    );
    if ((Mt(n) ? oc.has(n) : Pm(n)) || (o || vt(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ et(l)) {
      const u = i && Jr(n) ? l : l.value;
      return o && je(u) ? /* @__PURE__ */ ul(u) : u;
    }
    return je(l) ? o ? /* @__PURE__ */ ul(l) : /* @__PURE__ */ Vt(l) : l;
  }
}
class ic extends rc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, o) {
    let r = t[n];
    const i = be(t) && Jr(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ un(r);
      if (!/* @__PURE__ */ Ot(s) && !/* @__PURE__ */ un(s) && (r = /* @__PURE__ */ Re(r), s = /* @__PURE__ */ Re(s)), !i && /* @__PURE__ */ et(r) && !/* @__PURE__ */ et(s))
        return d || (r.value = s), !0;
    }
    const l = i ? Number(n) < t.length : Ve(t, n), u = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ et(t) ? t : o
    );
    return t === /* @__PURE__ */ Re(o) && u && (l ? ft(s, r) && kn(t, "set", n, s) : kn(t, "add", n, s)), u;
  }
  deleteProperty(t, n) {
    const s = Ve(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && s && kn(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Mt(n) || !oc.has(n)) && vt(t, "has", n), s;
  }
  ownKeys(t) {
    return vt(
      t,
      "iterate",
      be(t) ? "length" : ps
    ), Reflect.ownKeys(t);
  }
}
class lc extends rc {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Mm = /* @__PURE__ */ new ic(), qm = /* @__PURE__ */ new lc(), Im = /* @__PURE__ */ new ic(!0), Rm = /* @__PURE__ */ new lc(!0), al = (e) => e, Xo = (e) => Reflect.getPrototypeOf(e);
function Dm(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = /* @__PURE__ */ Re(o), i = zn(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, d = o[e](...s), c = n ? al : t ? Yn : Lt;
    return !t && vt(
      r,
      "iterate",
      u ? ll : ps
    ), zt(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: f, done: m } = d.next();
          return m ? { value: f, done: m } : {
            value: l ? [c(f[0]), c(f[1])] : c(f),
            done: m
          };
        }
      }
    );
  };
}
function Jo(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Fm(e, t) {
  const n = {
    get(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ Re(r), l = /* @__PURE__ */ Re(o);
      e || (ft(o, l) && vt(i, "get", o), vt(i, "get", l));
      const { has: u } = Xo(i), d = t ? al : e ? Yn : Lt;
      if (u.call(i, o))
        return d(r.get(o));
      if (u.call(i, l))
        return d(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && vt(/* @__PURE__ */ Re(o), "iterate", ps), o.size;
    },
    has(o) {
      const r = this.__v_raw, i = /* @__PURE__ */ Re(r), l = /* @__PURE__ */ Re(o);
      return e || (ft(o, l) && vt(i, "has", o), vt(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, u = /* @__PURE__ */ Re(l), d = t ? al : e ? Yn : Lt;
      return !e && vt(u, "iterate", ps), l.forEach((c, f) => o.call(r, d(c), d(f), i));
    }
  };
  return zt(
    n,
    e ? {
      add: Jo("add"),
      set: Jo("set"),
      delete: Jo("delete"),
      clear: Jo("clear")
    } : {
      add(o) {
        const r = /* @__PURE__ */ Re(this), i = Xo(r), l = /* @__PURE__ */ Re(o), u = !t && !/* @__PURE__ */ Ot(o) && !/* @__PURE__ */ un(o) ? l : o;
        return i.has.call(r, u) || ft(o, u) && i.has.call(r, o) || ft(l, u) && i.has.call(r, l) || (r.add(u), kn(r, "add", u, u)), this;
      },
      set(o, r) {
        !t && !/* @__PURE__ */ Ot(r) && !/* @__PURE__ */ un(r) && (r = /* @__PURE__ */ Re(r));
        const i = /* @__PURE__ */ Re(this), { has: l, get: u } = Xo(i);
        let d = l.call(i, o);
        d || (o = /* @__PURE__ */ Re(o), d = l.call(i, o));
        const c = u.call(i, o);
        return i.set(o, r), d ? ft(r, c) && kn(i, "set", o, r) : kn(i, "add", o, r), this;
      },
      delete(o) {
        const r = /* @__PURE__ */ Re(this), { has: i, get: l } = Xo(r);
        let u = i.call(r, o);
        u || (o = /* @__PURE__ */ Re(o), u = i.call(r, o)), l && l.call(r, o);
        const d = r.delete(o);
        return u && kn(r, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ Re(this), r = o.size !== 0, i = o.clear();
        return r && kn(
          o,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = Dm(o, e, t);
  }), n;
}
function ri(e, t) {
  const n = Fm(e, t);
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_isShallow" ? t : o === "__v_raw" ? s : Reflect.get(
    Ve(n, o) && o in s ? n : s,
    o,
    r
  );
}
const Bm = {
  get: /* @__PURE__ */ ri(!1, !1)
}, Nm = {
  get: /* @__PURE__ */ ri(!1, !0)
}, Vm = {
  get: /* @__PURE__ */ ri(!0, !1)
}, Lm = {
  get: /* @__PURE__ */ ri(!0, !0)
}, ac = /* @__PURE__ */ new WeakMap(), uc = /* @__PURE__ */ new WeakMap(), dc = /* @__PURE__ */ new WeakMap(), cc = /* @__PURE__ */ new WeakMap();
function zm(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  return /* @__PURE__ */ un(e) ? e : ii(
    e,
    !1,
    Mm,
    Bm,
    ac
  );
}
// @__NO_SIDE_EFFECTS__
function fc(e) {
  return ii(
    e,
    !1,
    Im,
    Nm,
    uc
  );
}
// @__NO_SIDE_EFFECTS__
function ul(e) {
  return ii(
    e,
    !0,
    qm,
    Vm,
    dc
  );
}
// @__NO_SIDE_EFFECTS__
function Bn(e) {
  return ii(
    e,
    !0,
    Rm,
    Lm,
    cc
  );
}
function ii(e, t, n, s, o) {
  if (!je(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = zm(hm(e));
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function jn(e) {
  return /* @__PURE__ */ un(e) ? /* @__PURE__ */ jn(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function un(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ot(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function li(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Re(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Re(t) : e;
}
function pc(e) {
  return !Ve(e, "__v_skip") && Object.isExtensible(e) && jd(e, "__v_skip", !0), e;
}
const Lt = (e) => je(e) ? /* @__PURE__ */ Vt(e) : e, Yn = (e) => je(e) ? /* @__PURE__ */ ul(e) : e;
// @__NO_SIDE_EFFECTS__
function et(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
  return mc(e, !1);
}
// @__NO_SIDE_EFFECTS__
function mn(e) {
  return mc(e, !0);
}
function mc(e, t) {
  return /* @__PURE__ */ et(e) ? e : new jm(e, t);
}
class jm {
  constructor(t, n) {
    this.dep = new si(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ Re(t), this._value = n ? t : Lt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ot(t) || /* @__PURE__ */ un(t);
    t = s ? t : /* @__PURE__ */ Re(t), ft(t, n) && (this._rawValue = t, this._value = s ? t : Lt(t), this.dep.trigger());
  }
}
function Km(e) {
  e.dep && e.dep.trigger();
}
function a(e) {
  return /* @__PURE__ */ et(e) ? e.value : e;
}
function We(e) {
  return De(e) ? e() : a(e);
}
const Hm = {
  get: (e, t, n) => t === "__v_raw" ? e : a(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return /* @__PURE__ */ et(o) && !/* @__PURE__ */ et(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function hc(e) {
  return /* @__PURE__ */ jn(e) ? e : new Proxy(e, Hm);
}
class Um {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new si(), { get: s, set: o } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = s, this._set = o;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function gc(e) {
  return new Um(e);
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  const t = be(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = yc(e, n);
  return t;
}
class Wm {
  constructor(t, n, s) {
    this._object = t, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._key = Mt(n) ? n : String(n), this._raw = /* @__PURE__ */ Re(t);
    let o = !0, r = t;
    if (!be(t) || Mt(this._key) || !Jr(this._key))
      do
        o = !/* @__PURE__ */ li(r) || /* @__PURE__ */ Ot(r);
      while (o && (r = r.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = a(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ et(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ et(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Tm(this._raw, this._key);
  }
}
class Gm {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function vc(e, t, n) {
  return /* @__PURE__ */ et(e) ? e : De(e) ? new Gm(e) : je(e) && arguments.length > 1 ? yc(e, t, n) : /* @__PURE__ */ B(e);
}
function yc(e, t, n) {
  return new Wm(e, t, n);
}
class Ym {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new si(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = To - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ze !== this)
      return Jd(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ec(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Xm(e, t, n = !1) {
  let s, o;
  return De(e) ? s = e : (s = e.get, o = e.set), new Ym(s, o, n);
}
const Zo = {}, _r = /* @__PURE__ */ new WeakMap();
let as;
function Jm(e, t = !1, n = as) {
  if (n) {
    let s = _r.get(n);
    s || _r.set(n, s = []), s.push(e);
  }
}
function Zm(e, t, n = Be) {
  const { immediate: s, deep: o, once: r, scheduler: i, augmentJob: l, call: u } = n, d = (C) => o ? C : /* @__PURE__ */ Ot(C) || o === !1 || o === 0 ? _n(C, 1) : _n(C);
  let c, f, m, p, g = !1, b = !1;
  if (/* @__PURE__ */ et(e) ? (f = () => e.value, g = /* @__PURE__ */ Ot(e)) : /* @__PURE__ */ jn(e) ? (f = () => d(e), g = !0) : be(e) ? (b = !0, g = e.some((C) => /* @__PURE__ */ jn(C) || /* @__PURE__ */ Ot(C)), f = () => e.map((C) => {
    if (/* @__PURE__ */ et(C))
      return C.value;
    if (/* @__PURE__ */ jn(C))
      return d(C);
    if (De(C))
      return u ? u(C, 2) : C();
  })) : De(e) ? t ? f = u ? () => u(e, 2) : e : f = () => {
    if (m) {
      Tn();
      try {
        m();
      } finally {
        An();
      }
    }
    const C = as;
    as = c;
    try {
      return u ? u(e, 3, [p]) : e(p);
    } finally {
      as = C;
    }
  } : f = fs, t && o) {
    const C = f, F = o === !0 ? 1 / 0 : o;
    f = () => _n(C(), F);
  }
  const w = jl(), x = () => {
    c.stop(), w && w.active && Nd(w.effects, c);
  };
  if (r && t) {
    const C = t;
    t = (...F) => {
      try {
        return C(...F);
      } finally {
        x();
      }
    };
  }
  let y = b ? new Array(e.length).fill(Zo) : Zo;
  const v = (C) => {
    if (!(!(c.flags & 1) || !c.dirty && !C))
      if (t) {
        const F = c.run();
        if (C || o || g || (b ? F.some(($, S) => ft($, y[S])) : ft(F, y))) {
          const $ = as;
          Tn();
          try {
            m && m(), as = c;
            const S = [
              F,
              // pass undefined as the old value when it's changed for the first time
              y === Zo ? void 0 : b && y[0] === Zo ? [] : y,
              p
            ];
            y = F, u ? u(t, 3, S) : (
              // @ts-expect-error
              t(...S)
            );
          } finally {
            as = $, An();
          }
        }
      } else
        c.run();
  };
  return l && l(v), c = new Yd(f), c.scheduler = i ? () => i(v, !1) : v, p = (C) => Jm(C, !1, c), m = c.onStop = () => {
    const C = _r.get(c);
    if (C) {
      if (u)
        u(C, 4);
      else
        for (const F of C) F();
      _r.delete(c);
    }
  }, t ? s ? v(!0) : y = c.run() : i ? i(v.bind(null, !0), !0) : c.run(), x.pause = c.pause.bind(c), x.resume = c.resume.bind(c), x.stop = x, x;
}
function _n(e, t = 1 / 0, n) {
  if (t <= 0 || !je(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ et(e))
    _n(e.value, t, n);
  else if (be(e))
    for (let s = 0; s < e.length; s++)
      _n(e[s], t, n);
  else if (wr(e) || zn(e))
    e.forEach((s) => {
      _n(s, t, n);
    });
  else if (zd(e)) {
    for (const s in e)
      _n(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && _n(e[s], t, n);
  }
  return e;
}
function zo(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (o) {
    ai(o, t, n);
  }
}
function dn(e, t, n, s) {
  if (De(e)) {
    const o = zo(e, t, n, s);
    return o && Vd(o) && o.catch((r) => {
      ai(r, t, n);
    }), o;
  }
  if (be(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(dn(e[r], t, n, s));
    return o;
  }
}
function ai(e, t, n, s = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Be;
  if (t) {
    let l = t.parent;
    const u = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let f = 0; f < c.length; f++)
          if (c[f](e, u, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Tn(), zo(r, null, 10, [
        e,
        u,
        d
      ]), An();
      return;
    }
  }
  Qm(e, n, o, s, i);
}
function Qm(e, t, n, s = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const xt = [];
let Ht = -1;
const sn = [];
let Nn = null, Os = 0;
const bc = /* @__PURE__ */ Promise.resolve();
let Cr = null;
function Ue(e) {
  const t = Cr || bc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function eh(e) {
  let t = Ht + 1, n = xt.length;
  for (; t < n; ) {
    const s = t + n >>> 1, o = xt[s], r = Po(o);
    r < e || r === e && o.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Wl(e) {
  if (!(e.flags & 1)) {
    const t = Po(e), n = xt[xt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Po(n) ? xt.push(e) : xt.splice(eh(t), 0, e), e.flags |= 1, xc();
  }
}
function xc() {
  Cr || (Cr = bc.then(_c));
}
function th(e) {
  if (!be(e))
    Nn && e.id === -1 ? Nn.splice(Os + 1, 0, e) : e.flags & 1 || (sn.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      sn.push(e[t]);
  xc();
}
function wc(e, t, n, s = Ht + 1) {
  for (; s < xt.length; s++) {
    const o = xt[s];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || t !== void 0 && !(o.id >= t))
        continue;
      xt.splice(s, 1), s = e ? s - 1 : Ht, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function kc(e, t, n = 0) {
  if (sn.length) {
    let s = sn, o = 0;
    if (t) {
      s = [];
      for (let i = 0; i < sn.length; i++) {
        const l = sn[i];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? sn[o++] = l : s.push(l);
      }
    }
    const r = [...new Set(s)].sort((i, l) => Po(i) - Po(l));
    if (sn.length = o, Nn) {
      for (let i = 0; i < r.length; i++)
        Nn.push(r[i]);
      return;
    }
    for (Nn = r, Os = 0; Os < Nn.length; Os++) {
      const i = Nn[Os];
      i.flags & 4 && (i.flags &= -2), i.flags & 8 || i(), i.flags &= -2;
    }
    Nn = null, Os = 0;
  }
}
let Ri = !1;
function nh(e, t) {
  if (Ri) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(sn);
  e(), Ri = !0;
  try {
    wc(void 0, t), kc(void 0, n, t);
  } finally {
    Ri = !1;
  }
}
const Po = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _c(e) {
  try {
    for (Ht = 0; Ht < xt.length; Ht++) {
      const t = xt[Ht];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), zo(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ht < xt.length; Ht++) {
      const t = xt[Ht];
      t && (t.flags &= -2);
    }
    Ht = -1, xt.length = 0, kc(), Cr = null, (xt.length || sn.length) && _c();
  }
}
let gt = null, Cc = null;
function Sr(e) {
  const t = gt;
  return gt = e, Cc = e && e.type.__scopeId || null, t;
}
function E(e, t = gt, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && Ar(-1);
    const r = Sr(t), i = Cn.length;
    let l;
    try {
      l = e(...o);
    } finally {
      for (let u = Cn.length; u > i; u--) Ql();
      Sr(r), s._d && Ar(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function $r(e, t) {
  if (gt === null)
    return e;
  const n = mi(gt), s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, i, l, u = Be] = t[o];
    r && (De(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && _n(i), s.push({
      dir: r,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: u
    }));
  }
  return e;
}
function ss(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let u = l.dir[s];
    u && (Tn(), dn(u, n, 8, [
      e.el,
      l,
      e,
      t
    ]), An());
  }
}
function Sc(e, t) {
  if (Ct) {
    let n = Ct.provides;
    const s = Ct.parent && Ct.parent.provides;
    s === n && (n = Ct.provides = Object.create(s)), n[e] = t;
  }
}
function Gl(e, t, n = !1) {
  const s = jt();
  if (s || Ds) {
    let o = Ds ? Ds._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && De(t) ? t.call(s && s.proxy) : t;
  }
}
const sh = /* @__PURE__ */ Symbol.for("v-scx"), oh = () => Gl(sh);
function kt(e, t) {
  return ui(e, null, t);
}
function $c(e, t) {
  return ui(
    e,
    null,
    { flush: "post" }
  );
}
function rh(e, t) {
  return ui(
    e,
    null,
    { flush: "sync" }
  );
}
function ve(e, t, n) {
  return ui(e, t, n);
}
function ui(e, t, n = Be) {
  const { immediate: s, deep: o, flush: r, once: i } = n, l = zt({}, n), u = t && s || !t && r !== "post";
  let d;
  if (Mo) {
    if (r === "sync") {
      const p = oh();
      d = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!u) {
      const p = () => {
      };
      return p.stop = fs, p.resume = fs, p.pause = fs, p;
    }
  }
  const c = Ct;
  l.call = (p, g, b) => dn(p, c, g, b);
  let f = !1;
  r === "post" ? l.scheduler = (p) => {
    p.i = c, bt(p, c && c.suspense);
  } : r !== "sync" && (f = !0, l.scheduler = (p, g) => {
    g ? p() : Wl(p);
  }), l.augmentJob = (p) => {
    t && (p.flags |= 4), f && (p.flags |= 2, c && (p.id = c.uid, p.i = c));
  };
  const m = Zm(e, t, l);
  return Mo && (d ? d.push(m) : u && m()), m;
}
const Dn = /* @__PURE__ */ new WeakMap(), Ec = /* @__PURE__ */ Symbol("_vte"), di = (e) => e.__isTeleport, us = (e) => e && (e.disabled || e.disabled === ""), ih = (e) => e && (e.defer || e.defer === ""), Za = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Qa = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, dl = (e, t) => {
  const n = e && e.to;
  return Ze(n) ? t ? t(n) : null : n;
}, lh = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, o, r, i, l, u, d) {
    const {
      mc: c,
      pc: f,
      pbc: m,
      o: { insert: p, querySelector: g, createText: b, createComment: w, parentNode: x }
    } = d, y = us(t.props);
    let { dynamicChildren: v } = t;
    const C = (S, k, M) => {
      S.shapeFlag & 16 && c(
        S.children,
        k,
        M,
        o,
        r,
        i,
        l,
        u
      );
    }, F = (S = t) => {
      const k = us(S.props), M = S.target = dl(S.props, g), I = cl(M, S, b, p);
      M && (i !== "svg" && Za(M) ? i = "svg" : i !== "mathml" && Qa(M) && (i = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add(M), k || (C(S, M, I), mo(S, !1)));
    }, $ = (S) => {
      const k = () => {
        if (Dn.get(S) === k) {
          if (Dn.delete(S), us(S.props)) {
            const M = x(S.el) || n;
            C(S, M, S.anchor), mo(S, !0);
          }
          F(S);
        }
      };
      Dn.set(S, k), bt(k, r);
    };
    if (e == null) {
      const S = t.el = b(""), k = t.anchor = b("");
      if (p(S, n, s), p(k, n, s), ih(t.props) || r && r.pendingBranch) {
        $(t);
        return;
      }
      y && (C(t, n, k), mo(t, !0)), F();
    } else {
      t.el = e.el;
      const S = t.anchor = e.anchor, k = Dn.get(e);
      if (k) {
        k.flags |= 8, Dn.delete(e), $(t);
        return;
      }
      t.targetStart = e.targetStart;
      const M = t.target = e.target, I = t.targetAnchor = e.targetAnchor, L = us(e.props), se = L ? n : M, ie = L ? S : I;
      if (i === "svg" || Za(M) ? i = "svg" : (i === "mathml" || Qa(M)) && (i = "mathml"), v ? (m(
        e.dynamicChildren,
        v,
        se,
        o,
        r,
        i,
        l
      ), Zl(e, t, !0)) : u || f(
        e,
        t,
        se,
        ie,
        o,
        r,
        i,
        l,
        !1
      ), y)
        L ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Qo(
          t,
          n,
          S,
          d,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const ge = dl(t.props, g);
        ge && (t.target = ge, Qo(
          t,
          ge,
          null,
          d,
          0
        ));
      } else L && Qo(
        t,
        M,
        I,
        d,
        1
      );
      mo(t, y);
    }
  },
  remove(e, t, n, { um: s, o: { remove: o } }, r) {
    const {
      shapeFlag: i,
      children: l,
      anchor: u,
      targetStart: d,
      targetAnchor: c,
      target: f,
      props: m
    } = e, p = us(m), g = r || !p, b = Dn.get(e);
    if (b && (b.flags |= 8, Dn.delete(e)), f && (o(d), o(c)), r && o(u), !b && (p || f) && i & 16)
      for (let w = 0; w < l.length; w++) {
        const x = l[w];
        s(
          x,
          t,
          n,
          g,
          !!x.dynamicChildren
        );
      }
  },
  move: Qo,
  hydrate: ah
};
function Qo(e, t, n, { o: { insert: s }, m: o }, r = 2) {
  r === 0 && (e.targetStart && s(e.targetStart, t, n), s(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: i, anchor: l, shapeFlag: u, children: d, props: c } = e, f = r === 2;
  if (f && s(i, t, n), !Dn.has(e) && (!f || us(c)) && u & 16)
    for (let m = 0; m < d.length; m++)
      o(
        d[m],
        t,
        n,
        2
      );
  f && s(l, t, n);
}
function ah(e, t, n, s, o, r, {
  o: { nextSibling: i, parentNode: l, querySelector: u, insert: d, createText: c }
}, f) {
  function m(w, x) {
    let y = x;
    for (; y; ) {
      if (y && y.nodeType === 8) {
        if (y.data === "teleport start anchor")
          t.targetStart = y;
        else if (y.data === "teleport anchor") {
          t.targetAnchor = y, w._lpa = t.targetAnchor && i(t.targetAnchor);
          break;
        }
      }
      y = i(y);
    }
  }
  function p(w, x) {
    x.anchor = f(
      i(w),
      x,
      l(w),
      n,
      s,
      o,
      r
    );
  }
  const g = t.target = dl(
    t.props,
    u
  ), b = us(t.props);
  if (g) {
    const w = g._lpa || g.firstChild;
    t.shapeFlag & 16 && (b ? (p(e, t), m(g, w), t.targetAnchor || cl(
      g,
      t,
      c,
      d,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === g ? e : null
    )) : (t.anchor = i(e), m(g, w), t.targetAnchor || cl(g, t, c, d), f(
      w && i(w),
      t,
      g,
      n,
      s,
      o,
      r
    ))), mo(t, b);
  } else b && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = i(e));
  return t.anchor && i(t.anchor);
}
const Yl = lh;
function mo(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, o;
    for (t ? (s = e.el, o = e.anchor) : (s = e.targetStart, o = e.targetAnchor); s && s !== o; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function cl(e, t, n, s, o = null) {
  const r = t.targetStart = n(""), i = t.targetAnchor = n("");
  return r[Ec] = i, e && (s(r, e, o), s(i, e, o)), i;
}
const Di = /* @__PURE__ */ Symbol("_leaveCb");
function uh(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== qt) {
        t = n;
        break;
      }
  }
  return t;
}
function Tc(e) {
  if (!Pc(e))
    return di(e.type) && e.children ? uh(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && De(n.default))
      return n.default();
  }
}
function Er(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Er(
      di(n.type) && Tc(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === W && be(e.children)) {
    const n = Fc(e.children, !1);
    n && Er(n, t);
  }
}
function fl(e) {
  if (e.component)
    return fl(e.component.subTree);
  if (e.type === W) {
    const t = be(e.children) && Fc(e.children, !1);
    return t ? fl(t) : void 0;
  }
  if (e.type !== qt)
    return e;
}
// @__NO_SIDE_EFFECTS__
function V(e, t) {
  return De(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    zt({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ac() {
  const e = jt();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function dh(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function eu(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Tr = /* @__PURE__ */ new WeakMap();
function wo(e, t, n, s, o = !1) {
  if (be(e)) {
    e.forEach(
      (b, w) => wo(
        b,
        t && (be(t) ? t[w] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Rs(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && wo(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? mi(s.component) : s.el, i = o ? null : r, { i: l, r: u } = e, d = t && t.r, c = l.refs === Be ? l.refs = {} : l.refs, f = l.setupState, m = /* @__PURE__ */ Re(f), p = f === Be ? Bd : (b) => eu(c, b) ? !1 : Ve(m, b), g = (b, w) => !(w && eu(c, w));
  if (d != null && d !== u) {
    if (tu(t), Ze(d))
      c[d] = null, p(d) && (f[d] = null);
    else if (/* @__PURE__ */ et(d)) {
      const b = t;
      g(d, b.k) && (d.value = null), b.k && (c[b.k] = null);
    }
  }
  if (De(u))
    zo(u, l, 12, [i, c]);
  else {
    const b = Ze(u), w = /* @__PURE__ */ et(u);
    if (b || w) {
      const x = () => {
        if (e.f) {
          const y = b ? p(u) ? f[u] : c[u] : g() || !e.k ? u.value : c[e.k];
          if (o)
            be(y) && Nd(y, r);
          else if (be(y))
            y.includes(r) || y.push(r);
          else if (b)
            c[u] = [r], p(u) && (f[u] = c[u]);
          else {
            const v = [r];
            g(u, e.k) && (u.value = v), e.k && (c[e.k] = v);
          }
        } else b ? (c[u] = i, p(u) && (f[u] = i)) : w && (g(u, e.k) && (u.value = i), e.k && (c[e.k] = i));
      };
      if (i) {
        const y = () => {
          x(), Tr.delete(e);
        };
        y.id = -1, Tr.set(e, y), bt(y, n);
      } else
        tu(e), x();
    }
  }
}
function tu(e) {
  const t = Tr.get(e);
  t && (t.flags |= 8, Tr.delete(e));
}
ei().requestIdleCallback;
ei().cancelIdleCallback;
const Rs = (e) => !!e.type.__asyncLoader, Pc = (e) => e.type.__isKeepAlive;
function ch(e, t, n = Ct, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Tn();
      const l = ea(n), u = dn(t, n, e, i);
      return l(), An(), u;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const ci = (e) => (t, n = Ct) => {
  (!Mo || e === "sp") && ch(e, (...s) => t(...s), n);
}, Ke = ci("m"), fh = ci("u"), an = ci(
  "bum"
), hn = ci("um"), ph = "components", Oc = /* @__PURE__ */ Symbol.for("v-ndc");
function ws(e) {
  return Ze(e) ? mh(ph, e, !1) || e : e || Oc;
}
function mh(e, t, n = !0, s = !1) {
  const o = gt || Ct;
  if (o) {
    const r = o.type;
    {
      const l = Hh(
        r,
        !1
      );
      if (l && (l === t || l === pt(t) || l === Qr(pt(t))))
        return r;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      nu(o[e] || r[e], t) || // global registration
      nu(o.appContext[e], t)
    );
    return !i && s ? r : i;
  }
}
function nu(e, t) {
  return e && (e[t] || e[pt(t)] || e[Qr(pt(t))]);
}
function pe(e, t, n, s) {
  let o;
  const r = n, i = be(e);
  if (i || Ze(e)) {
    const l = i && /* @__PURE__ */ jn(e);
    let u = !1, d = !1;
    l && (u = !/* @__PURE__ */ Ot(e), d = /* @__PURE__ */ un(e), e = oi(e)), o = new Array(e.length);
    for (let c = 0, f = e.length; c < f; c++)
      o[c] = t(
        u ? d ? Yn(Lt(e[c])) : Lt(e[c]) : e[c],
        c,
        void 0,
        r
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      o = [];
    else {
      o = new Array(e);
      for (let l = 0; l < e; l++)
        o[l] = t(l + 1, l, void 0, r);
    }
  else if (je(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, u) => t(l, u, void 0, r)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let u = 0, d = l.length; u < d; u++) {
        const c = l[u];
        o[u] = t(e[c], c, u, r);
      }
    }
  else
    o = [];
  return o;
}
function G(e, t, n, s, o, r) {
  if (n == null && (n = {}), gt.ce || gt.parent && Rs(gt.parent) && gt.parent.ce) {
    const d = n, c = Object.keys(d).length > 0;
    return t !== "default" && (d.name = t), h(), D(
      W,
      null,
      [O("slot", d, s && s())],
      c ? -2 : 64
    );
  }
  let i = e[t];
  i && i._c && (i._d = !1);
  const l = Cn.length;
  h();
  let u;
  try {
    const d = i && Mc(i(n)), c = n.key || r || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    u = D(
      W,
      {
        key: (c && !Mt(c) ? c : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let c = Cn.length; c > l; c--) Ql();
    throw d;
  } finally {
    i && i._c && (i._d = !0);
  }
  return u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), u;
}
function Mc(e) {
  return e.some((t) => Vs(t) ? !(t.type === qt || t.type === W && !Mc(t.children)) : !0) ? e : null;
}
function hh(e, t) {
  const n = {};
  for (const s in e)
    n[yo(s)] = e[s];
  return n;
}
const pl = (e) => e ? Jc(e) ? mi(e) : pl(e.parent) : null, ko = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ zt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => pl(e.parent),
    $root: (e) => pl(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      Wl(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ue.bind(e.proxy)),
    $watch: (e) => fs
  })
), Fi = (e, t) => e !== Be && !e.__isScriptSetup && Ve(e, t), gh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: l, appContext: u } = e;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Fi(s, t))
          return i[t] = 1, s[t];
        if (Ve(r, t))
          return i[t] = 3, r[t];
        if (n !== Be && Ve(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = ko[t];
    let c, f;
    if (d)
      return t === "$attrs" && vt(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== Be && Ve(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, Ve(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return Fi(o, t) ? (o[t] = n, !0) : Ve(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, props: r, type: i }
  }, l) {
    let u;
    return !!(n[l] || Fi(t, l) || Ve(r, l) || Ve(s, l) || Ve(ko, l) || Ve(o.config.globalProperties, l) || (u = i.__cssModules) && u[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Ve(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function vh() {
  return yh().attrs;
}
function yh(e) {
  const t = jt();
  return t.setupContext || (t.setupContext = Qc(t));
}
function ml(e) {
  return be(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function qc(e, t) {
  const n = ml(e);
  for (const s in t) {
    if (s.startsWith("__skip")) continue;
    let o = n[s];
    o ? be(o) || De(o) ? o = n[s] = { type: o, default: t[s] } : o.default = t[s] : o === null && (o = n[s] = { default: t[s] }), o && t[`__skip_${s}`] && (o.skipFactory = !0);
  }
  return n;
}
function Hs(e, t) {
  return !e || !t ? e || t : be(e) && be(t) ? e.concat(t) : zt({}, ml(e), ml(t));
}
function Ic(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || Object.defineProperty(n, s, {
      enumerable: !0,
      get: () => e[s]
    });
  return n;
}
function Rc() {
  return {
    app: null,
    config: {
      isNativeTag: Bd,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let bh = 0;
function xh(e, t) {
  return function(s, o = null) {
    De(s) || (s = zt({}, s)), o != null && !je(o) && (o = null);
    const r = Rc(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const d = r.app = {
      _uid: bh++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Yh,
      get config() {
        return r.config;
      },
      set config(c) {
      },
      use(c, ...f) {
        return i.has(c) || (c && De(c.install) ? (i.add(c), c.install(d, ...f)) : De(c) && (i.add(c), c(d, ...f))), d;
      },
      mixin(c) {
        return d;
      },
      component(c, f) {
        return f ? (r.components[c] = f, d) : r.components[c];
      },
      directive(c, f) {
        return f ? (r.directives[c] = f, d) : r.directives[c];
      },
      mount(c, f, m) {
        if (!u) {
          const p = d._ceVNode || O(s, o);
          return p.appContext = r, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(p, c, m), u = !0, d._container = c, c.__vue_app__ = d, mi(p.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        u && (dn(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(c, f) {
        return r.provides[c] = f, d;
      },
      runWithContext(c) {
        const f = Ds;
        Ds = d;
        try {
          return c();
        } finally {
          Ds = f;
        }
      }
    };
    return d;
  };
}
let Ds = null;
function Us(e, t, n = Be) {
  const s = jt(), o = pt(t), r = On(t), i = Dc(e, o), l = gc((u, d) => {
    let c, f = Be, m;
    return rh(() => {
      const p = e[o];
      ft(c, p) && (c = p, d());
    }), {
      get() {
        return u(), n.get ? n.get(c) : c;
      },
      set(p) {
        const g = n.set ? n.set(p) : p;
        if (!ft(g, c) && !(f !== Be && ft(p, f)))
          return;
        const b = s.vnode.props, w = !!(b && // check if parent has passed v-model
        (t in b || o in b || r in b) && (`onUpdate:${t}` in b || `onUpdate:${o}` in b || `onUpdate:${r}` in b));
        w || (c = p, d()), s.emit(`update:${t}`, g), ft(p, f) && (ft(p, g) && !ft(g, m) || // #13524: browsers differ in when they flush microtasks between
        // event listeners. If a v-model listener emits an intermediate value
        // and a following listener restores the model to its previous prop
        // value before parent updates are flushed, the parent render can be
        // deduped as having no prop change. Force a local update so DOM state
        // such as an input's value is synchronized back to the current model.
        w && f !== Be && !ft(g, c)) && d(), f = p, m = g;
      }
    };
  });
  return l[Symbol.iterator] = () => {
    let u = 0;
    return {
      next() {
        return u < 2 ? { value: u++ ? i || Be : l, done: !1 } : { done: !0 };
      }
    };
  }, l;
}
const Dc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${pt(t)}Modifiers`] || e[`${On(t)}Modifiers`];
function wh(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Be;
  let o = n;
  const r = t.startsWith("update:"), i = r && Dc(s, t.slice(7));
  i && (i.trim && (o = n.map((c) => Ze(c) ? c.trim() : c)), i.number && (o = o.map(zl)));
  let l, u = s[l = yo(t)] || // also try camelCase event handler (#2249)
  s[l = yo(pt(t))];
  !u && r && (u = s[l = yo(On(t))]), u && dn(
    u,
    e,
    6,
    o
  );
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, dn(
      d,
      e,
      6,
      o
    );
  }
}
function kh(e, t, n = !1) {
  const s = t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {};
  return r ? (be(r) ? r.forEach((l) => i[l] = null) : zt(i, r), je(e) && s.set(e, i), i) : (je(e) && s.set(e, null), null);
}
function fi(e, t) {
  return !e || !Yr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Ve(e, t[0].toLowerCase() + t.slice(1)) || Ve(e, On(t)) || Ve(e, t));
}
function su(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: u,
    render: d,
    renderCache: c,
    props: f,
    data: m,
    setupState: p,
    ctx: g,
    inheritAttrs: b
  } = e, w = Sr(e);
  let x, y;
  try {
    if (n.shapeFlag & 4) {
      const C = o || s, F = C;
      x = on(
        d.call(
          F,
          C,
          c,
          f,
          p,
          m,
          g
        )
      ), y = l;
    } else {
      const C = t;
      x = on(
        C.length > 1 ? C(
          f,
          { attrs: l, slots: i, emit: u }
        ) : C(
          f,
          null
        )
      ), y = t.props ? l : _h(l);
    }
  } catch (C) {
    Cn.length = 0, ai(C, e, 1), x = O(qt);
  }
  let v = x;
  if (y && b !== !1) {
    const C = Object.keys(y), { shapeFlag: F } = v;
    C.length && F & 7 && (r && C.some(Xr) && (y = Ch(
      y,
      r
    )), v = gs(v, y, !1, !0));
  }
  if (n.dirs && (v = gs(v, null, !1, !0), v.dirs = v.dirs ? v.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const C = di(v.type) && Tc(v) || v;
    Er(C, n.transition);
  }
  return x = v, Sr(w), x;
}
function Fc(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    if (Vs(o)) {
      if (o.type !== qt || o.children === "v-if") {
        if (n)
          return;
        n = o;
      }
    } else
      return;
  }
  return n;
}
const _h = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Yr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ch = (e, t) => {
  const n = {};
  for (const s in e)
    (!Xr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Sh(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: l, patchFlag: u } = t, d = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? ou(s, i, d) : !!i;
    if (u & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const m = c[f];
        if (Bc(i, s, m) && !fi(d, m))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? ou(s, i, d) : !0 : !!i;
  return !1;
}
function ou(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (!Ve(e, r) || Bc(t, e, r) && !fi(n, r))
      return !0;
  }
  return !1;
}
function Bc(e, t, n) {
  const s = e[n], o = t[n];
  return n === "style" && je(s) && je(o) ? !ti(s, o) : s !== o;
}
function $h({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = s, e = o), o === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Nc = {}, Vc = () => Object.create(Nc), Lc = (e) => Object.getPrototypeOf(e) === Nc;
function Eh(e, t, n, s = !1) {
  const o = {}, r = Vc();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), zc(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : /* @__PURE__ */ fc(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Th(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ Re(o), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let m = c[f];
        if (fi(e.emitsOptions, m))
          continue;
        const p = t[m];
        if (u)
          if (Ve(r, m))
            p !== r[m] && (r[m] = p, d = !0);
          else {
            const g = pt(m);
            o[g] = hl(
              u,
              l,
              g,
              p,
              e,
              !1
            );
          }
        else
          p !== r[m] && (r[m] = p, d = !0);
      }
    }
  } else {
    zc(e, t, o, r) && (d = !0);
    let c;
    for (const f in l)
      (!t || // for camelCase
      !Ve(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = On(f)) === f || !Ve(t, c))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (o[f] = hl(
        u,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete o[f]);
    if (r !== l)
      for (const f in r)
        (!t || !Ve(t, f)) && (delete r[f], d = !0);
  }
  d && kn(e.attrs, "set", "");
}
function zc(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let u in t) {
      if (vo(u))
        continue;
      const d = t[u];
      let c;
      o && Ve(o, c = pt(u)) ? !r || !r.includes(c) ? n[c] = d : (l || (l = {}))[c] = d : fi(e.emitsOptions, u) || (!(u in s) || d !== s[u]) && (s[u] = d, i = !0);
    }
  if (r) {
    const u = /* @__PURE__ */ Re(n), d = l || Be;
    for (let c = 0; c < r.length; c++) {
      const f = r[c];
      n[f] = hl(
        o,
        u,
        f,
        d[f],
        e,
        !Ve(d, f)
      );
    }
  }
  return i;
}
function hl(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = Ve(i, "default");
    if (l && s === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && De(u)) {
        const { propsDefaults: d } = o;
        if (n in d)
          s = d[n];
        else {
          const c = ea(o);
          s = d[n] = u.call(
            null,
            t
          ), c();
        }
      } else
        s = u;
      o.ce && o.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === On(n)) && (s = !0));
  }
  return s;
}
function Ah(e, t, n = !1) {
  const s = t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  if (!r)
    return je(e) && s.set(e, ds), ds;
  if (be(r))
    for (let d = 0; d < r.length; d++) {
      const c = pt(r[d]);
      ru(c) && (i[c] = Be);
    }
  else if (r)
    for (const d in r) {
      const c = pt(d);
      if (ru(c)) {
        const f = r[d], m = i[c] = be(f) || De(f) ? { type: f } : zt({}, f), p = m.type;
        let g = !1, b = !0;
        if (be(p))
          for (let w = 0; w < p.length; ++w) {
            const x = p[w], y = De(x) && x.name;
            if (y === "Boolean") {
              g = !0;
              break;
            } else y === "String" && (b = !1);
          }
        else
          g = De(p) && p.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = g, m[
          1
          /* shouldCastTrue */
        ] = b, (g || Ve(m, "default")) && l.push(c);
      }
    }
  const u = [i, l];
  return je(e) && s.set(e, u), u;
}
function ru(e) {
  return e[0] !== "$" && !vo(e);
}
const Xl = (e) => e === "_" || e === "_ctx" || e === "$stable", Jl = (e) => be(e) ? e.map(on) : [on(e)], Ph = (e, t, n) => {
  if (t._n)
    return t;
  const s = E((...o) => Jl(t(...o)), n);
  return s._c = !1, s;
}, jc = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (Xl(o)) continue;
    const r = e[o];
    if (De(r))
      t[o] = Ph(o, r, s);
    else if (r != null) {
      const i = Jl(r);
      t[o] = () => i;
    }
  }
}, Kc = (e, t) => {
  const n = Jl(t);
  e.slots.default = () => n;
}, Hc = (e, t, n) => {
  for (const s in t)
    (n || !Xl(s)) && (e[s] = t[s]);
}, Oh = (e, t, n) => {
  const s = e.slots = Vc();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Hc(s, t, n), n && jd(s, "_", o, !0)) : jc(t, s);
  } else t && Kc(e, t);
}, Mh = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = Be;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : Hc(o, t, n) : (r = !t.$stable, jc(t, o)), i = t;
  } else t && (Kc(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !Xl(l) && i[l] == null && delete o[l];
}, bt = Fh;
function qh(e) {
  return Ih(e);
}
function Ih(e, t) {
  const n = ei();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: u,
    setText: d,
    setElementText: c,
    parentNode: f,
    nextSibling: m,
    setScopeId: p = fs,
    insertStaticContent: g
  } = e, b = (_, P, N, U = null, j = null, K = null, ee = void 0, Z = null, X = !!P.dynamicChildren) => {
    if (_ === P)
      return;
    _ && !so(_, P) && (U = Xe(_), He(_, j, K, !0), _ = null), P.patchFlag === -2 && (X = !1, P.dynamicChildren = null), P.dynamicChildren && _ && _.dynamicChildren && _.dynamicChildren.hasOnce && (P.dynamicChildren === ds && (P.dynamicChildren = []), P.dynamicChildren.hasOnce = !0);
    const { type: z, ref: de, shapeFlag: te } = P;
    switch (z) {
      case pi:
        w(_, P, N, U);
        break;
      case qt:
        x(_, P, N, U);
        break;
      case Ni:
        _ == null && y(P, N, U, ee);
        break;
      case W:
        se(
          _,
          P,
          N,
          U,
          j,
          K,
          ee,
          Z,
          X
        );
        break;
      default:
        te & 1 ? F(
          _,
          P,
          N,
          U,
          j,
          K,
          ee,
          Z,
          X
        ) : te & 6 ? ie(
          _,
          P,
          N,
          U,
          j,
          K,
          ee,
          Z,
          X
        ) : (te & 64 || te & 128) && z.process(
          _,
          P,
          N,
          U,
          j,
          K,
          ee,
          Z,
          X,
          ke
        );
    }
    de != null && j ? wo(de, _ && _.ref, K, P || _, !P) : de == null && _ && _.ref != null && wo(_.ref, null, K, _, !0);
  }, w = (_, P, N, U) => {
    if (_ == null)
      s(
        P.el = l(P.children),
        N,
        U
      );
    else {
      const j = P.el = _.el;
      P.children !== _.children && d(j, P.children);
    }
  }, x = (_, P, N, U) => {
    _ == null ? s(
      P.el = u(P.children || ""),
      N,
      U
    ) : P.el = _.el;
  }, y = (_, P, N, U) => {
    [_.el, _.anchor] = g(
      _.children,
      P,
      N,
      U,
      _.el,
      _.anchor
    );
  }, v = ({ el: _, anchor: P }, N, U) => {
    let j;
    for (; _ && _ !== P; )
      j = m(_), s(_, N, U), _ = j;
    s(P, N, U);
  }, C = ({ el: _, anchor: P }) => {
    let N;
    for (; _ && _ !== P; )
      N = m(_), o(_), _ = N;
    o(P);
  }, F = (_, P, N, U, j, K, ee, Z, X) => {
    if (P.type === "svg" ? ee = "svg" : P.type === "math" && (ee = "mathml"), _ == null)
      $(
        P,
        N,
        U,
        j,
        K,
        ee,
        Z,
        X
      );
    else {
      const z = _.el && _.el._isVueCE ? _.el : null;
      try {
        z && z._beginPatch(), M(
          _,
          P,
          j,
          K,
          ee,
          Z,
          X
        );
      } finally {
        z && z._endPatch();
      }
    }
  }, $ = (_, P, N, U, j, K, ee, Z) => {
    let X, z;
    const { props: de, shapeFlag: te, transition: ce, dirs: ye } = _;
    if (X = _.el = i(
      _.type,
      K,
      de && de.is,
      de
    ), te & 8 ? c(X, _.children) : te & 16 && k(
      _.children,
      X,
      null,
      U,
      j,
      Bi(_, K),
      ee,
      Z
    ), ye && ss(_, null, U, "created"), S(X, _, _.scopeId, ee, U), de) {
      for (const Le in de)
        Le !== "value" && !vo(Le) && r(X, Le, null, de[Le], K, U);
      "value" in de && r(X, "value", null, de.value, K), (z = de.onVnodeBeforeMount) && Zt(z, U, _);
    }
    ye && ss(_, null, U, "beforeMount");
    const qe = Rh(j, ce);
    qe && ce.beforeEnter(X), s(X, P, N), ((z = de && de.onVnodeMounted) || qe || ye) && bt(() => {
      z && Zt(z, U, _), qe && ce.enter(X), ye && ss(_, null, U, "mounted");
    }, j);
  }, S = (_, P, N, U, j) => {
    if (N && p(_, N), U)
      for (let K = 0; K < U.length; K++)
        p(_, U[K]);
    if (j) {
      let K = j.subTree;
      if (P === K || Wc(K.type) && (K.ssContent === P || K.ssFallback === P)) {
        const ee = j.vnode;
        S(
          _,
          ee,
          ee.scopeId,
          ee.slotScopeIds,
          j.parent
        );
      }
    }
  }, k = (_, P, N, U, j, K, ee, Z, X = 0) => {
    for (let z = X; z < _.length; z++) {
      const de = _[z] = Z ? wn(_[z]) : on(_[z]);
      b(
        null,
        de,
        P,
        N,
        U,
        j,
        K,
        ee,
        Z
      );
    }
  }, M = (_, P, N, U, j, K, ee) => {
    const Z = P.el = _.el;
    let { patchFlag: X, dynamicChildren: z, dirs: de } = P;
    X |= _.patchFlag & 16;
    const te = _.props || Be, ce = P.props || Be;
    let ye;
    if (N && os(N, !1), (ye = ce.onVnodeBeforeUpdate) && Zt(ye, N, P, _), de && ss(P, _, N, "beforeUpdate"), N && os(N, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    z && (!_.dynamicChildren || _.dynamicChildren.length !== z.length) && (X = 0, ee = !1, z = null), (te.innerHTML && ce.innerHTML == null || te.textContent && ce.textContent == null) && c(Z, ""), z ? I(
      _.dynamicChildren,
      z,
      Z,
      N,
      U,
      Bi(P, j),
      K
    ) : ee || $e(
      _,
      P,
      Z,
      null,
      N,
      U,
      Bi(P, j),
      K,
      !1
    ), X > 0) {
      if (X & 16)
        L(Z, te, ce, N, j);
      else if (X & 2 && te.class !== ce.class && r(Z, "class", null, ce.class, j), X & 4 && r(Z, "style", te.style, ce.style, j), X & 8) {
        const qe = P.dynamicProps;
        for (let Le = 0; Le < qe.length; Le++) {
          const Ne = qe[Le], rt = te[Ne], mt = ce[Ne];
          (mt !== rt || Ne === "value") && r(Z, Ne, rt, mt, j, N);
        }
      }
      X & 1 && _.children !== P.children && c(Z, P.children);
    } else !ee && z == null && L(Z, te, ce, N, j);
    ((ye = ce.onVnodeUpdated) || de) && bt(() => {
      ye && Zt(ye, N, P, _), de && ss(P, _, N, "updated");
    }, U);
  }, I = (_, P, N, U, j, K, ee) => {
    for (let Z = 0; Z < P.length; Z++) {
      const X = _[Z], z = P[Z], de = X.el || gl(X), te = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        de && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (X.type === W || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !so(X, z) || // - In the case of a component, it could contain anything.
        X.shapeFlag & 198) ? f(de) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          N
        )
      );
      b(
        X,
        z,
        te,
        null,
        U,
        j,
        K,
        ee,
        !0
      );
    }
  }, L = (_, P, N, U, j) => {
    if (P !== N) {
      if (P !== Be)
        for (const K in P)
          !vo(K) && !(K in N) && r(
            _,
            K,
            P[K],
            null,
            j,
            U
          );
      for (const K in N) {
        if (vo(K)) continue;
        const ee = N[K], Z = P[K];
        ee !== Z && K !== "value" && r(_, K, Z, ee, j, U);
      }
      "value" in N && r(_, "value", P.value, N.value, j);
    }
  }, se = (_, P, N, U, j, K, ee, Z, X) => {
    const z = P.el = _ ? _.el : l(""), de = P.anchor = _ ? _.anchor : l("");
    let { patchFlag: te, dynamicChildren: ce, slotScopeIds: ye } = P;
    ye && (Z = Z ? Z.concat(ye) : ye), _ == null ? (s(z, N, U), s(de, N, U), k(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      P.children || [],
      N,
      de,
      j,
      K,
      ee,
      Z,
      X
    )) : te > 0 && te & 64 && ce && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren && _.dynamicChildren.length === ce.length ? (I(
      _.dynamicChildren,
      ce,
      N,
      j,
      K,
      ee,
      Z
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (P.key != null || j && P === j.subTree) && Zl(
      _,
      P,
      !0
      /* shallow */
    )) : $e(
      _,
      P,
      N,
      de,
      j,
      K,
      ee,
      Z,
      X
    );
  }, ie = (_, P, N, U, j, K, ee, Z, X) => {
    P.slotScopeIds = Z, _ == null ? P.shapeFlag & 512 ? j.ctx.activate(
      P,
      N,
      U,
      ee,
      X
    ) : ge(
      P,
      N,
      U,
      j,
      K,
      ee,
      X
    ) : H(_, P, X);
  }, ge = (_, P, N, U, j, K, ee) => {
    const Z = _.component = Lh(
      _,
      U,
      j
    );
    if (Pc(_) && (Z.ctx.renderer = ke), zh(Z, !1, ee), Z.asyncDep) {
      if (j && j.registerDep(
        Z,
        J,
        ee,
        K
      ), !_.el) {
        const X = Z.subTree = O(qt);
        x(null, X, P, N), _.placeholder = X.el;
      }
    } else
      J(
        Z,
        _,
        P,
        N,
        j,
        K,
        ee
      );
  }, H = (_, P, N) => {
    const U = P.component = _.component;
    if (Sh(_, P, N))
      if (U.asyncDep && !U.asyncResolved) {
        P.el = _.el, P.placeholder = _.placeholder, ae(U, P, N);
        return;
      } else
        U.next = P, U.update();
    else
      P.el = _.el, P.placeholder = _.placeholder, U.vnode = P;
  }, J = (_, P, N, U, j, K, ee) => {
    const Z = () => {
      if (_.isMounted) {
        let { next: te, bu: ce, u: ye, parent: qe, vnode: Le } = _;
        {
          const Xt = Uc(_);
          if (Xt) {
            te && (te.el = Le.el, ae(_, te, ee)), Xt.asyncDep.then(() => {
              bt(() => {
                _.isUnmounted || z();
              }, j);
            });
            return;
          }
        }
        let Ne = te, rt;
        os(_, !1), te ? (te.el = Le.el, ae(_, te, ee)) : te = Le, ce && vr(ce), (rt = te.props && te.props.onVnodeBeforeUpdate) && Zt(rt, qe, te, Le), os(_, !0);
        const mt = su(_), Yt = _.subTree;
        _.subTree = mt, b(
          Yt,
          mt,
          // parent may have changed if it's in a teleport
          f(Yt.el),
          // anchor may have changed if it's in a fragment
          Xe(Yt),
          _,
          j,
          K
        ), te.el = mt.el, Ne === null && $h(_, mt.el), ye && bt(ye, j), (rt = te.props && te.props.onVnodeUpdated) && bt(
          () => Zt(rt, qe, te, Le),
          j
        );
      } else {
        let te;
        const { el: ce, props: ye } = P, { bm: qe, m: Le, parent: Ne, root: rt, type: mt } = _, Yt = Rs(P);
        os(_, !1), qe && vr(qe), !Yt && (te = ye && ye.onVnodeBeforeMount) && Zt(te, Ne, P), os(_, !0);
        {
          rt.ce && rt.ce._hasShadowRoot() && rt.ce._injectChildStyle(
            mt,
            _.parent ? _.parent.type : void 0
          );
          const Xt = _.subTree = su(_);
          b(
            null,
            Xt,
            N,
            U,
            _,
            j,
            K
          ), P.el = Xt.el;
        }
        if (Le && bt(Le, j), !Yt && (te = ye && ye.onVnodeMounted)) {
          const Xt = P;
          bt(
            () => Zt(te, Ne, Xt),
            j
          );
        }
        (P.shapeFlag & 256 || Ne && Rs(Ne.vnode) && Ne.vnode.shapeFlag & 256) && _.a && bt(_.a, j), _.isMounted = !0, P = N = U = null;
      }
    };
    _.scope.on();
    const X = _.effect = new Yd(Z);
    _.scope.off();
    const z = _.update = X.run.bind(X), de = _.job = X.runIfDirty.bind(X);
    de.i = _, de.id = _.uid, X.scheduler = () => Wl(de), os(_, !0), z();
  }, ae = (_, P, N) => {
    P.component = _;
    const U = _.vnode.props;
    _.vnode = P, _.next = null, Th(_, P.props, U, N), Mh(_, P.children, N), Tn(), wc(_), An();
  }, $e = (_, P, N, U, j, K, ee, Z, X = !1) => {
    const z = _ && _.children, de = _ ? _.shapeFlag : 0, te = P.children, { patchFlag: ce, shapeFlag: ye } = P;
    if (ce > 0) {
      if (ce & 128) {
        ne(
          z,
          te,
          N,
          U,
          j,
          K,
          ee,
          Z,
          X
        );
        return;
      } else if (ce & 256) {
        Me(
          z,
          te,
          N,
          U,
          j,
          K,
          ee,
          Z,
          X
        );
        return;
      }
    }
    ye & 8 ? (de & 16 && Oe(z, j, K), te !== z && c(N, te)) : de & 16 ? ye & 16 ? ne(
      z,
      te,
      N,
      U,
      j,
      K,
      ee,
      Z,
      X
    ) : Oe(z, j, K, !0) : (de & 8 && c(N, ""), ye & 16 && k(
      te,
      N,
      U,
      j,
      K,
      ee,
      Z,
      X
    ));
  }, Me = (_, P, N, U, j, K, ee, Z, X) => {
    _ = _ || ds, P = P || ds;
    const z = _.length, de = P.length, te = Math.min(z, de);
    let ce;
    for (ce = 0; ce < te; ce++) {
      const ye = P[ce] = X ? wn(P[ce]) : on(P[ce]);
      b(
        _[ce],
        ye,
        N,
        null,
        j,
        K,
        ee,
        Z,
        X
      );
    }
    z > de ? Oe(
      _,
      j,
      K,
      !0,
      !1,
      te
    ) : k(
      P,
      N,
      U,
      j,
      K,
      ee,
      Z,
      X,
      te
    );
  }, ne = (_, P, N, U, j, K, ee, Z, X) => {
    let z = 0;
    const de = P.length;
    let te = _.length - 1, ce = de - 1;
    for (; z <= te && z <= ce; ) {
      const ye = _[z], qe = P[z] = X ? wn(P[z]) : on(P[z]);
      if (so(ye, qe))
        b(
          ye,
          qe,
          N,
          null,
          j,
          K,
          ee,
          Z,
          X
        );
      else
        break;
      z++;
    }
    for (; z <= te && z <= ce; ) {
      const ye = _[te], qe = P[ce] = X ? wn(P[ce]) : on(P[ce]);
      if (so(ye, qe))
        b(
          ye,
          qe,
          N,
          null,
          j,
          K,
          ee,
          Z,
          X
        );
      else
        break;
      te--, ce--;
    }
    if (z > te) {
      if (z <= ce) {
        const ye = ce + 1, qe = ye < de ? P[ye].el : U;
        for (; z <= ce; )
          b(
            null,
            P[z] = X ? wn(P[z]) : on(P[z]),
            N,
            qe,
            j,
            K,
            ee,
            Z,
            X
          ), z++;
      }
    } else if (z > ce)
      for (; z <= te; )
        He(_[z], j, K, !0), z++;
    else {
      const ye = z, qe = z, Le = /* @__PURE__ */ new Map();
      for (z = qe; z <= ce; z++) {
        const Tt = P[z] = X ? wn(P[z]) : on(P[z]);
        Tt.key != null && Le.set(Tt.key, z);
      }
      let Ne, rt = 0;
      const mt = ce - qe + 1;
      let Yt = !1, Xt = 0;
      const to = new Array(mt);
      for (z = 0; z < mt; z++) to[z] = 0;
      for (z = ye; z <= te; z++) {
        const Tt = _[z];
        if (rt >= mt) {
          He(Tt, j, K, !0);
          continue;
        }
        let Jt;
        if (Tt.key != null)
          Jt = Le.get(Tt.key);
        else
          for (Ne = qe; Ne <= ce; Ne++)
            if (to[Ne - qe] === 0 && so(Tt, P[Ne])) {
              Jt = Ne;
              break;
            }
        Jt === void 0 ? He(Tt, j, K, !0) : (to[Jt - qe] = z + 1, Jt >= Xt ? Xt = Jt : Yt = !0, b(
          Tt,
          P[Jt],
          N,
          null,
          j,
          K,
          ee,
          Z,
          X
        ), rt++);
      }
      const za = Yt ? Dh(to) : ds;
      for (Ne = za.length - 1, z = mt - 1; z >= 0; z--) {
        const Tt = qe + z, Jt = P[Tt], ja = P[Tt + 1], Ka = Tt + 1 < de ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ja.el || gl(ja)
        ) : U;
        to[z] === 0 ? b(
          null,
          Jt,
          N,
          Ka,
          j,
          K,
          ee,
          Z,
          X
        ) : Yt && (Ne < 0 || z !== za[Ne] ? tt(Jt, N, Ka, 2) : Ne--);
      }
    }
  }, tt = (_, P, N, U, j = null) => {
    const { el: K, type: ee, transition: Z, children: X, shapeFlag: z } = _;
    if (z & 6) {
      tt(_.component.subTree, P, N, U);
      return;
    }
    if (z & 128) {
      _.suspense.move(P, N, U);
      return;
    }
    if (z & 64) {
      ee.move(_, P, N, ke);
      return;
    }
    if (ee === W) {
      s(K, P, N);
      for (let te = 0; te < X.length; te++)
        tt(X[te], P, N, U);
      s(_.anchor, P, N);
      return;
    }
    if (ee === Ni) {
      v(_, P, N);
      return;
    }
    if (U !== 2 && z & 1 && Z)
      if (U === 0)
        Z.persisted && !K[Di] ? s(K, P, N) : (Z.beforeEnter(K), s(K, P, N), bt(() => Z.enter(K), j));
      else {
        const { leave: te, delayLeave: ce, afterLeave: ye } = Z, qe = () => {
          _.ctx.isUnmounted ? o(K) : s(K, P, N);
        }, Le = () => {
          const Ne = K._isLeaving || !!K[Di];
          K._isLeaving && K[Di](
            !0
            /* cancelled */
          ), Z.persisted && !Ne ? qe() : te(K, () => {
            qe(), ye && ye();
          });
        };
        ce ? ce(K, qe, Le) : Le();
      }
    else
      s(K, P, N);
  }, He = (_, P, N, U = !1, j = !1) => {
    const {
      type: K,
      props: ee,
      ref: Z,
      children: X,
      dynamicChildren: z,
      shapeFlag: de,
      patchFlag: te,
      dirs: ce,
      cacheIndex: ye,
      memo: qe
    } = _;
    if ((te === -2 || z && z.hasOnce) && (j = !1), Z != null && (Tn(), wo(Z, null, N, _, !0), An()), ye != null && (!_.ctx || _.ctx === P) && (P.renderCache[ye] = void 0), de & 256) {
      P.ctx.deactivate(_);
      return;
    }
    const Le = de & 1 && ce, Ne = !Rs(_);
    let rt;
    if (Ne && (rt = ee && ee.onVnodeBeforeUnmount) && Zt(rt, P, _), de & 6)
      Fe(_.component, N, U);
    else {
      if (de & 128) {
        _.suspense.unmount(N, U);
        return;
      }
      Le && ss(_, null, P, "beforeUnmount"), de & 64 ? _.type.remove(
        _,
        P,
        N,
        ke,
        U
      ) : z && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !z.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (K !== W || te > 0 && te & 64) ? Oe(
        z,
        P,
        N,
        !1,
        !0
      ) : (K === W && te & 384 || !j && de & 16) && Oe(X, P, N), U && we(_);
    }
    const mt = qe != null && ye == null;
    (Ne && (rt = ee && ee.onVnodeUnmounted) || Le || mt) && bt(() => {
      rt && Zt(rt, P, _), Le && ss(_, null, P, "unmounted"), mt && (_.el = null);
    }, N);
  }, we = (_) => {
    const { type: P, el: N, anchor: U, transition: j } = _, K = P === W;
    if (K && !j) {
      Pe(N, U);
      return;
    }
    if (P === Ni) {
      C(_), j && !j.persisted && j.afterLeave && j.afterLeave();
      return;
    }
    const ee = K ? fl(_) : _, Z = () => {
      K ? f(N) && Pe(N, U) : o(N), j && !j.persisted && j.afterLeave && j.afterLeave();
    };
    if (ee && ee.shapeFlag & 1 && j && !j.persisted) {
      const { leave: X, delayLeave: z } = j, de = ee.el, te = () => X(de, Z);
      z ? z(de, Z, te) : te();
    } else
      Z();
  }, Pe = (_, P) => {
    let N;
    for (; _ !== P; )
      N = m(_), o(_), _ = N;
    o(P);
  }, Fe = (_, P, N) => {
    const { bum: U, scope: j, job: K, subTree: ee, um: Z, m: X, a: z } = _;
    iu(X), iu(z), U && vr(U), j.stop(), K ? (K.flags |= 8, He(ee, _, P, N)) : _.vnode.el && ee && (ee.transition = _.vnode.transition, He(ee, _, P, N)), Z && bt(Z, P), bt(() => {
      _.isUnmounted = !0;
    }, P);
  }, Oe = (_, P, N, U = !1, j = !1, K = 0) => {
    for (let ee = K; ee < _.length; ee++)
      He(_[ee], P, N, U, j);
  }, Xe = (_) => {
    if (_.shapeFlag & 6)
      return Xe(_.component.subTree);
    if (_.shapeFlag & 128)
      return _.suspense.next();
    const P = m(_.anchor || _.el), N = P && P[Ec];
    return N ? m(N) : P;
  }, at = (_, P, N) => {
    const U = _ && P._vnode ? void 0 : _ && _.component ? _.component.uid : Vh();
    nh(() => {
      _ == null ? P._vnode && He(P._vnode, null, null, !0) : b(
        P._vnode || null,
        _,
        P,
        null,
        null,
        null,
        N
      ), P._vnode = _;
    }, U);
  }, ke = {
    p: b,
    um: He,
    m: tt,
    r: we,
    mt: ge,
    mc: k,
    pc: $e,
    pbc: I,
    n: Xe,
    o: e
  };
  return {
    render: at,
    hydrate: void 0,
    createApp: xh(at)
  };
}
function Bi({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function os({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Rh(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zl(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (be(s) && be(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = wn(o[r]), l.el = i.el), !n && l.patchFlag !== -2 && Zl(i, l)), l.type === pi && (l.patchFlag === -1 && (l = o[r] = wn(l)), l.el = i.el), l.type === qt && !l.el && (l.el = i.el);
    }
}
function Dh(e) {
  const t = e.slice(), n = [0];
  let s, o, r, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const d = e[s];
    if (d !== 0) {
      if (o = n[n.length - 1], e[o] < d) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < d ? r = l + 1 : i = l;
      d < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function Uc(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Uc(t);
}
function iu(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function gl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? gl(t.subTree) : null;
}
const Wc = (e) => e.__isSuspense;
function Fh(e, t) {
  t && t.pendingBranch ? be(e) ? t.effects.push(...e) : t.effects.push(e) : th(e);
}
const W = /* @__PURE__ */ Symbol.for("v-fgt"), pi = /* @__PURE__ */ Symbol.for("v-txt"), qt = /* @__PURE__ */ Symbol.for("v-cmt"), Ni = /* @__PURE__ */ Symbol.for("v-stc"), Cn = [];
let wt = null;
function h(e = !1) {
  Cn.push(wt = e ? null : []);
}
function Ql() {
  Cn.pop(), wt = Cn[Cn.length - 1] || null;
}
let Ns = 1;
function Ar(e, t = !1) {
  Ns += e, e < 0 && wt && t && (wt.hasOnce = !0);
}
function Gc(e) {
  return e.dynamicChildren = Ns > 0 ? wt || ds : null, Ql(), Ns > 0 && wt && wt.push(e), e;
}
function A(e, t, n, s, o, r) {
  return Gc(
    T(
      e,
      t,
      n,
      s,
      o,
      r,
      !0
    )
  );
}
function D(e, t, n, s, o) {
  return Gc(
    O(
      e,
      t,
      n,
      s,
      o,
      !0
    )
  );
}
function Vs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function so(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Yc = ({ key: e }) => e ?? null, yr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ze(e) || /* @__PURE__ */ et(e) || De(e) ? { i: gt, r: e, k: t, f: !!n } : e : null);
function T(e, t = null, n = null, s = 0, o = null, r = e === W ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yc(t),
    ref: t && yr(t),
    scopeId: Cc,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: gt
  };
  return l ? (Pr(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= Ze(n) ? 8 : 16), Ns > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  wt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && wt.push(u), u;
}
const O = Bh;
function Bh(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === Oc) && (e = qt), Vs(e)) {
    const l = gs(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Pr(l, n), Ns > 0 && !r && wt && (l.shapeFlag & 6 ? wt[wt.indexOf(e)] = l : wt.push(l)), l.patchFlag = -2, l;
  }
  if (Uh(e) && (e = e.__vccOpts), t) {
    t = gn(t);
    let { class: l, style: u } = t;
    l && !Ze(l) && (t.class = Ee(l)), je(u) && (/* @__PURE__ */ li(u) && !be(u) && (u = zt({}, u)), t.style = Ie(u));
  }
  const i = Ze(e) ? 1 : Wc(e) ? 128 : di(e) ? 64 : je(e) ? 4 : De(e) ? 2 : 0;
  return T(
    e,
    t,
    n,
    s,
    o,
    i,
    r,
    !0
  );
}
function gn(e) {
  return e ? /* @__PURE__ */ li(e) || Lc(e) ? zt({}, e) : e : null;
}
function gs(e, t, n = !1, s = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: u } = e, d = t ? ue(o || {}, t) : o, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Yc(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? be(r) ? r.concat(yr(t)) : [r, yr(t)] : yr(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== W ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && gs(e.ssContent),
    ssFallback: e.ssFallback && gs(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return u && s && Er(
    c,
    u.clone(c)
  ), c;
}
function Q(e = " ", t = 0) {
  return O(pi, null, e, t);
}
function Y(e = "", t = !1) {
  return t ? (h(), D(qt, null, e)) : O(qt, null, e);
}
function on(e) {
  return e == null || typeof e == "boolean" ? O(qt) : be(e) ? O(
    W,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Vs(e) ? wn(e) : O(pi, null, String(e));
}
function wn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : gs(e);
}
function Pr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (be(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Pr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !Lc(t) ? t._ctx = gt : o === 3 && gt && (gt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (De(t)) {
    if (s & 65) {
      Pr(e, { default: t });
      return;
    }
    t = { default: t, _ctx: gt }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Q(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function ue(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Ee([t.class, s.class]));
      else if (o === "style")
        t.style = Ie([t.style, s.style]);
      else if (Yr(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(be(r) && r.includes(i)) ? t[o] = r ? [].concat(r, i) : i : i == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Xr(o) && (t[o] = i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function Zt(e, t, n, s = null) {
  dn(e, t, 7, [
    n,
    s
  ]);
}
const Nh = Rc();
let Xc = 0;
function Vh() {
  return Xc;
}
function Lh(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || Nh, r = {
    uid: Xc++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Wd(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ah(s, o),
    emitsOptions: kh(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Be,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Be,
    data: Be,
    props: Be,
    attrs: Be,
    slots: Be,
    refs: Be,
    setupState: Be,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = wh.bind(null, r), e.ce && e.ce(r), r;
}
let Ct = null;
const jt = () => Ct || gt;
let Or, Oo;
{
  const e = ei(), t = (n, s) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(s), (r) => {
      o.length > 1 ? o.forEach((i) => i(r)) : o[0](r);
    };
  };
  Or = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ct = n
  ), Oo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Mo = n
  );
}
const ea = (e) => {
  const t = Ct;
  return Or(e), e.scope.on(), () => {
    e.scope.off(), Or(t);
  };
}, lu = () => {
  Ct && Ct.scope.off(), Or(null);
};
function Jc(e) {
  return e.vnode.shapeFlag & 4;
}
let Mo = !1;
function zh(e, t = !1, n = !1) {
  t && Oo(t);
  const { props: s, children: o } = e.vnode, r = Jc(e);
  Eh(e, s, r, t), Oh(e, o, n || t);
  const i = r ? jh(e, t) : void 0;
  return t && Oo(!1), i;
}
function jh(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, gh);
  const { setup: s } = n;
  if (s) {
    Tn();
    const o = e.setupContext = s.length > 1 ? Qc(e) : null, r = ea(e), i = zo(
      s,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Vd(i);
    if (An(), r(), (l || e.sp) && !Rs(e) && dh(e), l) {
      if (i.then(lu, lu), t)
        return i.then((u) => {
          Oo(!0);
          try {
            au(e, u, t);
          } finally {
            Oo(!1);
          }
        }).catch((u) => {
          ai(u, e, 0);
        });
      e.asyncDep = i;
    } else
      au(e, i);
  } else
    Zc(e);
}
function au(e, t, n) {
  De(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : je(t) && (e.setupState = hc(t)), Zc(e);
}
function Zc(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || fs);
}
const Kh = {
  get(e, t) {
    return vt(e, "get", ""), e[t];
  }
};
function Qc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Kh),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function mi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(hc(pc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ko)
        return ko[n](e);
    },
    has(t, n) {
      return n in t || n in ko;
    }
  })) : e.proxy;
}
function Hh(e, t = !0) {
  return De(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Uh(e) {
  return De(e) && "__vccOpts" in e;
}
const q = (e, t) => /* @__PURE__ */ Xm(e, t, Mo);
function Sn(e, t, n) {
  try {
    Ar(-1);
    const s = arguments.length;
    return s === 2 ? je(t) && !be(t) ? Vs(t) ? O(e, null, [t]) : O(e, t) : O(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Vs(n) && (n = [n]), O(e, t, n));
  } finally {
    Ar(1);
  }
}
function Wh(e, t, n, s) {
  const o = n[s];
  if (o && Gh(o, e))
    return o;
  const r = t();
  return r.memo = e.slice(), r.cacheIndex = s, n[s] = r;
}
function Gh(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let s = 0; s < n.length; s++)
    if (ft(n[s], t[s]))
      return !1;
  return Ns > 0 && wt && wt.push(e), !0;
}
const Yh = "3.5.44";
let vl;
const uu = typeof window < "u" && window.trustedTypes;
if (uu)
  try {
    vl = /* @__PURE__ */ uu.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ef = vl ? (e) => vl.createHTML(e) : (e) => e, Xh = "http://www.w3.org/2000/svg", Jh = "http://www.w3.org/1998/Math/MathML", xn = typeof document < "u" ? document : null, du = xn && /* @__PURE__ */ xn.createElement("template"), Zh = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t === "svg" ? xn.createElementNS(Xh, e) : t === "mathml" ? xn.createElementNS(Jh, e) : n ? xn.createElement(e, { is: n }) : xn.createElement(e);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => xn.createTextNode(e),
  createComment: (e) => xn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => xn.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      du.innerHTML = ef(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = du.content;
      if (s === "svg" || s === "mathml") {
        const u = l.firstChild;
        for (; u.firstChild; )
          l.appendChild(u.firstChild);
        l.removeChild(u);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Qh = /* @__PURE__ */ Symbol("_vtc");
function eg(e, t, n) {
  const s = e[Qh];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Mr = /* @__PURE__ */ Symbol("_vod"), tf = /* @__PURE__ */ Symbol("_vsh"), yl = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[Mr] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : oo(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), oo(e, !0), s.enter(e)) : s.leave(e, () => {
      oo(e, !1);
    }) : oo(e, t));
  },
  beforeUnmount(e, { value: t }) {
    oo(e, t);
  }
};
function oo(e, t) {
  e.style.display = t ? e[Mr] : "none", e[tf] = !t;
}
const tg = /* @__PURE__ */ Symbol(""), ng = /(?:^|;)\s*display\s*:/;
function sg(e, t, n) {
  const s = e.style, o = Ze(n);
  let r = !1;
  if (n && !o) {
    if (t)
      if (Ze(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && ho(s, l, "");
        }
      else
        for (const i in t)
          n[i] == null && ho(s, i, "");
    for (const i in n) {
      i === "display" && (r = !0);
      const l = n[i];
      l != null ? rg(
        e,
        i,
        !Ze(t) && t ? t[i] : void 0,
        l
      ) || ho(s, i, l) : ho(s, i, "");
    }
  } else if (o) {
    if (t !== n) {
      const i = s[tg];
      i && (n += ";" + i), s.cssText = n, r = ng.test(n);
    }
  } else t && e.removeAttribute("style");
  Mr in e && ((!o || t !== n) && (e[Mr] = r ? s.display : ""), e[tf] && (s.display = "none"));
}
const er = /\s*!important$/;
function ho(e, t, n) {
  if (be(n))
    n.forEach((s) => ho(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    er.test(n) ? e.setProperty(t, n.replace(er, ""), "important") : e.setProperty(t, n);
  else {
    const s = og(e, t);
    er.test(n) ? e.setProperty(
      On(s),
      n.replace(er, ""),
      "important"
    ) : e[s] = n;
  }
}
const cu = ["Webkit", "Moz", "ms"], Vi = {};
function og(e, t) {
  const n = Vi[t];
  if (n)
    return n;
  let s = pt(t);
  if (s !== "filter" && s in e)
    return Vi[t] = s;
  s = Qr(s);
  for (let o = 0; o < cu.length; o++) {
    const r = cu[o] + s;
    if (r in e)
      return Vi[t] = r;
  }
  return t;
}
function rg(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Ze(s) && n === s;
}
const fu = "http://www.w3.org/1999/xlink";
function pu(e, t, n, s, o, r = _m(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(fu, t.slice(6, t.length)) : e.setAttributeNS(fu, t, n) : n == null || r && !Kd(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Mt(n) ? String(n) : n
  );
}
function mu(e, t, n, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ef(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Kd(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function Ms(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function ig(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const hu = /* @__PURE__ */ Symbol("_vei");
function lg(e, t, n, s, o = null) {
  const r = e[hu] || (e[hu] = {}), i = r[t];
  if (s && i)
    i.value = s;
  else {
    const [l, u] = dg(t);
    if (s) {
      const d = r[t] = pg(
        s,
        o
      );
      Ms(e, l, d, u);
    } else i && (ig(e, l, i, u), r[t] = void 0);
  }
}
const ag = /(Once|Passive|Capture)$/, ug = /^on:?(?:Once|Passive|Capture)$/;
function dg(e) {
  let t, n;
  for (; (n = e.match(ag)) && !ug.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : On(e.slice(2)), t];
}
let Li = 0;
const cg = /* @__PURE__ */ Promise.resolve(), fg = () => Li || (cg.then(() => Li = 0), Li = Date.now());
function pg(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const o = n.value;
    if (be(o)) {
      const r = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        r.call(s), s._stopped = !0;
      };
      const i = o.slice(), l = [s];
      for (let u = 0; u < i.length && !s._stopped; u++) {
        const d = i[u];
        d && dn(
          d,
          t,
          5,
          l
        );
      }
    } else
      dn(
        o,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = fg(), n;
}
const gu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, mg = (e, t, n, s, o, r) => {
  const i = o === "svg";
  t === "class" ? eg(e, s, i) : t === "style" ? sg(e, n, s) : Yr(t) ? Xr(t) || lg(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : hg(e, t, s, i)) ? (mu(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && pu(e, t, s, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (gg(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ze(s))) ? mu(e, pt(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), pu(e, t, s, i));
};
function hg(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && gu(t) && De(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return gu(t) && Ze(n) ? !1 : t in e;
}
function gg(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = pt(t);
  return Array.isArray(n) ? n.some((o) => pt(o) === s) : Object.keys(n).some((o) => pt(o) === s);
}
const vu = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return be(t) ? (n) => vr(t, n) : t;
};
function vg(e) {
  e.target.composing = !0;
}
function yu(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const tr = /* @__PURE__ */ Symbol("_assign"), nr = /* @__PURE__ */ Symbol("_initialValue");
function zi(e, t, n) {
  return t && (e = e.trim()), n && (e = zl(e)), e;
}
const yg = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e.parentNode && (e.type === "text" ? e[nr] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[nr] = e.defaultValue.replace(/\r\n?/g, `
`))), e[tr] = vu(o);
    const r = s || o.props && o.props.type === "number";
    Ms(e, t ? "change" : "input", (i) => {
      i.target.composing || e[tr](zi(e.value, n, r));
    }), (n || r) && Ms(e, "change", () => {
      e.value = zi(e.value, n, r);
    }), t || (Ms(e, "compositionstart", vg), Ms(e, "compositionend", yu), Ms(e, "change", yu));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const o = t ?? "", r = e[nr];
    delete e[nr], r !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== r ? e[tr](zi(e.value, n, s)) : e.value = o;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: o, number: r } }, i) {
    if (e[tr] = vu(i), e.composing) return;
    const l = (r || e.type === "number") && !/^0\d/.test(e.value) ? zl(e.value) : e.value, u = t ?? "";
    if (l === u)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || o && e.value.trim() === u) || (e.value = u);
  }
}, bg = ["ctrl", "shift", "alt", "meta"], xg = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => bg.some((n) => e[`${n}Key`] && !t.includes(n))
}, Gt = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((o, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = xg[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...r);
  }));
}, wg = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, nf = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((o) => {
    if (!("key" in o))
      return;
    const r = On(o.key);
    if (t.some(
      (i) => i === r || wg[i] === r
    ))
      return e(o);
  }));
}, kg = /* @__PURE__ */ zt({ patchProp: mg }, Zh);
let bu;
function _g() {
  return bu || (bu = qh(kg));
}
const Cg = ((...e) => {
  const t = _g().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const o = $g(s);
    if (!o) return;
    const r = t._component;
    !De(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, Sg(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
});
function Sg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function $g(e) {
  return Ze(e) ? document.querySelector(e) : e;
}
const xu = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Eg = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, s) => s ? s.toUpperCase() : n.toLowerCase()
), Tg = (e) => {
  const t = Eg(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Ag = (...e) => e.filter((t, n, s) => !!t && t.trim() !== "" && s.indexOf(t) === n).join(" ").trim(), wu = (e) => e === "";
var ro = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Pg = ({
  name: e,
  iconNode: t,
  absoluteStrokeWidth: n,
  "absolute-stroke-width": s,
  strokeWidth: o,
  "stroke-width": r,
  size: i = ro.width,
  color: l = ro.stroke,
  ...u
}, { slots: d }) => Sn(
  "svg",
  {
    ...ro,
    ...u,
    width: i,
    height: i,
    stroke: l,
    "stroke-width": wu(n) || wu(s) || n === !0 || s === !0 ? Number(o || r || ro["stroke-width"]) * 24 / Number(i) : o || r || ro["stroke-width"],
    class: Ag(
      "lucide",
      u.class,
      ...e ? [`lucide-${xu(Tg(e))}-icon`, `lucide-${xu(e)}`] : ["lucide-icon"]
    )
  },
  [...t.map((c) => Sn(...c)), ...d.default ? [d.default()] : []]
);
const ot = (e, t) => (n, { slots: s, attrs: o }) => Sn(
  Pg,
  {
    ...o,
    ...n,
    iconNode: t,
    name: e
  },
  s
);
const Og = ot("arrow-left", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
const bl = ot("arrow-right", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
const Mg = ot("arrow-up-right", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
const ms = ot("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const ta = ot("chevron-down", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const qg = ot("clipboard-copy", [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
]);
const na = ot("combine", [
  ["path", { d: "M10 18H5a3 3 0 0 1-3-3v-1", key: "ru65g8" }],
  ["path", { d: "M14 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2", key: "e30een" }],
  ["path", { d: "M20 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2", key: "2ahx8o" }],
  ["path", { d: "m7 21 3-3-3-3", key: "127cv2" }],
  ["rect", { x: "14", y: "14", width: "8", height: "8", rx: "2", key: "1b0bso" }],
  ["rect", { x: "2", y: "2", width: "8", height: "8", rx: "2", key: "1x09vl" }]
]);
const Ig = ot("corner-left-up", [
  ["path", { d: "M14 9 9 4 4 9", key: "1af5af" }],
  ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4", key: "1blwi3" }]
]);
const sf = ot("file-text", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
const Rg = ot("git-merge", [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 21V9a9 9 0 0 0 9 9", key: "7kw0sc" }]
]);
const Dg = ot("minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
const Fg = ot("mouse-pointer-click", [
  ["path", { d: "M14 4.1 12 6", key: "ita8i4" }],
  ["path", { d: "m5.1 8-2.9-.8", key: "1go3kf" }],
  ["path", { d: "m6 12-1.9 2", key: "mnht97" }],
  ["path", { d: "M7.2 2.2 8 5.1", key: "1cfko1" }],
  [
    "path",
    {
      d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
      key: "s0h3yz"
    }
  ]
]);
const Bg = ot("pause", [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
]);
const Ng = ot("play", [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
]);
const of = ot("plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const Vg = ot("repeat", [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
]);
const rf = ot("rotate-ccw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const Lg = ot("sliders-horizontal", [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
]);
const zg = ot("sparkles", [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
]);
const xl = ot("undo-2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
const Kn = ot("x", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function ku(e) {
  return typeof e == "string" ? `'${e}'` : new Kg().serialize(e);
}
const jg = " _-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz", sr = /* @__PURE__ */ (function() {
  const e = /* @__PURE__ */ new Uint8Array(128);
  for (let t = 0; t < 69; t++) e[jg.charCodeAt(t)] = t + 1;
  for (let t = 65; t <= 90; t++) e[t] = e[t + 32];
  return e;
})();
function ji(e, t) {
  if (e === t) return 0;
  const n = Math.min(e.length, t.length);
  let s = 0;
  for (let o = 0; o < n; o++) {
    const r = e.charCodeAt(o), i = t.charCodeAt(o);
    if (r === i) continue;
    const l = r < 128 && sr[r] ? sr[r] : r + 128, u = i < 128 && sr[i] ? sr[i] : i + 128;
    if (l !== u) return l < u ? -1 : 1;
    s === 0 && (s = r > i ? -1 : 1);
  }
  return e.length !== t.length ? e.length < t.length ? -1 : 1 : s;
}
const Kg = /* @__PURE__ */ (function() {
  class e {
    #e = /* @__PURE__ */ new Map();
    compare(n, s) {
      const o = typeof n, r = typeof s;
      return o === "string" && r === "string" ? ji(n, s) : o === "number" && r === "number" ? n - s : ji(this.serialize(n, !0), this.serialize(s, !0));
    }
    serialize(n, s) {
      if (n === null) return "null";
      switch (typeof n) {
        case "string":
          return s ? n : `'${n}'`;
        case "bigint":
          return `${n}n`;
        case "object":
          return this.$object(n);
        case "function":
          return this.$function(n);
      }
      return String(n);
    }
    serializeObject(n) {
      const s = Object.prototype.toString.call(n);
      if (s !== "[object Object]") return this.serializeBuiltInType(s.length < 10 ? `unknown:${s}` : s.slice(8, -1), n);
      const o = n.constructor, r = o === Object || o === void 0 ? "" : o.name;
      if (r !== "" && globalThis[r] === o) return this.serializeBuiltInType(r, n);
      if ("toJSON" in n && typeof n.toJSON == "function") {
        const u = n.toJSON();
        return r + (u !== null && typeof u == "object" ? this.$object(u) : `(${this.serialize(u)})`);
      }
      const i = Object.keys(n).sort(ji);
      let l = `${r}{`;
      for (let u = 0; u < i.length; u++) {
        const d = i[u];
        l += `${d}:${this.serialize(n[d])}`, u < i.length - 1 && (l += ",");
      }
      return l + "}";
    }
    serializeBuiltInType(n, s) {
      const o = this["$" + n];
      if (o) return o.call(this, s);
      if (typeof s.entries == "function") return this.serializeObjectEntries(n, s.entries());
      throw new Error(`Cannot serialize ${n}`);
    }
    serializeObjectEntries(n, s) {
      const o = Array.from(s).sort((i, l) => this.compare(i[0], l[0]));
      let r = `${n}{`;
      for (let i = 0; i < o.length; i++) {
        const [l, u] = o[i];
        r += `${this.serialize(l, !0)}:${this.serialize(u)}`, i < o.length - 1 && (r += ",");
      }
      return r + "}";
    }
    $object(n) {
      let s = this.#e.get(n);
      return s === void 0 && (this.#e.set(n, `#${this.#e.size}`), s = this.serializeObject(n), this.#e.set(n, s)), s;
    }
    $function(n) {
      const s = Function.prototype.toString.call(n);
      return s.slice(-15) === "[native code] }" ? `${n.name || ""}()[native]` : `${n.name}(${n.length})${s.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(n) {
      let s = "[";
      for (let o = 0; o < n.length; o++)
        s += this.serialize(n[o]), o < n.length - 1 && (s += ",");
      return s + "]";
    }
    $Date(n) {
      try {
        return `Date(${n.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(n) {
      return `ArrayBuffer[${new Uint8Array(n).join(",")}]`;
    }
    $Set(n) {
      return `Set${this.$Array(Array.from(n).sort((s, o) => this.compare(s, o)))}`;
    }
    $Map(n) {
      return this.serializeObjectEntries("Map", n.entries());
    }
  }
  for (const t of [
    "Error",
    "RegExp",
    "URL"
  ]) e.prototype["$" + t] = function(n) {
    return `${t}(${n})`;
  };
  for (const t of [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array"
  ]) e.prototype["$" + t] = function(n) {
    return `${t}[${n.join(",")}]`;
  };
  for (const t of ["BigInt64Array", "BigUint64Array"]) e.prototype["$" + t] = function(n) {
    return `${t}[${n.join("n,")}${n.length > 0 ? "n" : ""}]`;
  };
  return e;
})();
function qo(e, t) {
  return e === t || ku(e) === ku(t);
}
function Ls(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(n, Math.max(t, e));
}
function or(e, t) {
  let n = e;
  const s = t.toString(), o = s.indexOf("."), r = o >= 0 ? s.length - o : 0;
  if (r > 0) {
    const i = 10 ** r;
    n = Math.round(n * i) / i;
  }
  return n;
}
function _u(e, t, n, s) {
  t = Number(t), n = Number(n);
  const o = (e - (Number.isNaN(t) ? 0 : t)) % s;
  let r = or(Math.abs(o) * 2 >= s ? e + Math.sign(o) * (s - Math.abs(o)) : e - o, s);
  return Number.isNaN(t) ? !Number.isNaN(n) && r > n && (r = Math.floor(or(n / s, s)) * s) : r < t ? r = t : !Number.isNaN(n) && r > n && (r = t + Math.floor(or((n - t) / s, s)) * s), r = or(r, s), r;
}
function Ye(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, s = Symbol(n);
  return [(i) => {
    const l = Gl(s, i);
    if (l || l === null) return l;
    throw new Error(`Injection \`${s.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
  }, (i) => (Sc(s, i), i)];
}
function Ge() {
  let e = document.activeElement;
  if (e == null) return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; ) e = e.shadowRoot.activeElement;
  return e;
}
function sa(e, t, n) {
  const s = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && s.addEventListener(e, t, { once: !0 }), s.dispatchEvent(o);
}
function Hg(e) {
  if (typeof window > "u" || typeof e != "object" || e === null) return !1;
  const t = e.ownerDocument?.defaultView ?? window;
  return e instanceof HTMLElement || e instanceof t.HTMLElement;
}
function Fs(e) {
  return e == null;
}
function lf(e, t) {
  return Fs(e) ? !1 : Array.isArray(e) ? e.some((n) => qo(n, t)) : qo(e, t);
}
function ks(e, t) {
  return jl() ? (ni(e, t), !0) : !1;
}
// @__NO_SIDE_EFFECTS__
function af() {
  const e = /* @__PURE__ */ new Set(), t = (r) => {
    e.delete(r);
  };
  return {
    on: (r) => {
      e.add(r);
      const i = () => t(r);
      return ks(i), { off: i };
    },
    off: t,
    trigger: (...r) => Promise.all(Array.from(e).map((i) => i(...r))),
    clear: () => {
      e.clear();
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Ug(e) {
  let t = !1, n;
  const s = Gd(!0);
  return ((...o) => (t || (n = s.run(() => e(...o)), t = !0), n));
}
const $t = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Wg = (e) => typeof e < "u", Gg = Object.prototype.toString, Yg = (e) => Gg.call(e) === "[object Object]", Xg = () => {
}, Cu = /* @__PURE__ */ Jg();
function Jg() {
  var e, t, n;
  return $t && !!(!((e = window) === null || e === void 0 || (e = e.navigator) === null || e === void 0) && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) === null || t === void 0 || (t = t.navigator) === null || t === void 0 ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test((n = window) === null || n === void 0 ? void 0 : n.navigator.userAgent));
}
function Ki(e) {
  return Array.isArray(e) ? e : [e];
}
function Zg(e) {
  return jt();
}
// @__NO_SIDE_EFFECTS__
function uf(e) {
  if (!$t) return e;
  let t = 0, n, s;
  const o = () => {
    t -= 1, s && t <= 0 && (s.stop(), n = void 0, s = void 0);
  };
  return ((...r) => (t += 1, s || (s = Gd(!0), n = s.run(() => e(...r))), ks(o), n));
}
function Qg(e) {
  return /* @__PURE__ */ Vt(/* @__PURE__ */ et(e) ? new Proxy({}, {
    get(t, n, s) {
      return a(Reflect.get(e.value, n, s));
    },
    set(t, n, s) {
      return /* @__PURE__ */ et(e.value[n]) && !/* @__PURE__ */ et(s) ? e.value[n].value = s : e.value[n] = s, !0;
    },
    deleteProperty(t, n) {
      return Reflect.deleteProperty(e.value, n);
    },
    has(t, n) {
      return Reflect.has(e.value, n);
    },
    ownKeys() {
      return Object.keys(e.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    }
  }) : e);
}
function oa(e) {
  return Qg(q(e));
}
function ev(e, ...t) {
  const n = t.flat(), s = n[0];
  return oa(() => Object.fromEntries(typeof s == "function" ? Object.entries(/* @__PURE__ */ it(e)).filter(([o, r]) => !s(We(r), o)) : Object.entries(/* @__PURE__ */ it(e)).filter((o) => !n.includes(o[0]))));
}
function df(e, t = 1e4) {
  return gc((n, s) => {
    let o = We(e), r;
    const i = () => setTimeout(() => {
      o = We(e), s();
    }, We(t));
    return ks(() => {
      clearTimeout(r);
    }), {
      get() {
        return n(), o;
      },
      set(l) {
        o = l, s(), clearTimeout(r), r = i();
      }
    };
  });
}
function tv(e, t) {
  Zg() && an(e, t);
}
function ra(e, t, n = {}) {
  const { immediate: s = !0, immediateCallback: o = !1 } = n, r = /* @__PURE__ */ mn(!1);
  let i;
  function l() {
    i && (clearTimeout(i), i = void 0);
  }
  function u() {
    r.value = !1, l();
  }
  function d(...c) {
    o && e(), l(), r.value = !0, i = setTimeout(() => {
      r.value = !1, i = void 0, e(...c);
    }, We(t));
  }
  return s && (r.value = !0, $t && d()), ks(u), {
    isPending: /* @__PURE__ */ Bn(r),
    start: d,
    stop: u
  };
}
function nv(e = 1e3, t = {}) {
  const { controls: n = !1, callback: s } = t, o = ra(s ?? Xg, e, t), r = q(() => !o.isPending.value);
  return n ? {
    ready: r,
    ...o
  } : r;
}
function sv(e, t, n) {
  return ve(e, t, {
    ...n,
    immediate: !0
  });
}
const jo = $t ? window : void 0;
function It(e) {
  var t;
  const n = We(e);
  return (t = n?.$el) !== null && t !== void 0 ? t : n;
}
function Ft(...e) {
  const t = (s, o, r, i) => (s.addEventListener(o, r, i), () => s.removeEventListener(o, r, i)), n = q(() => {
    const s = Ki(We(e[0])).filter((o) => o != null);
    return s.every((o) => typeof o != "string") ? s : void 0;
  });
  return sv(() => {
    var s, o;
    return [
      (s = (o = n.value) === null || o === void 0 ? void 0 : o.map((r) => It(r))) !== null && s !== void 0 ? s : [jo].filter((r) => r != null),
      Ki(We(n.value ? e[1] : e[0])),
      Ki(a(n.value ? e[2] : e[1])),
      We(n.value ? e[3] : e[2])
    ];
  }, ([s, o, r, i], l, u) => {
    if (!s?.length || !o?.length || !r?.length) return;
    const d = Yg(i) ? { ...i } : i, c = s.flatMap((f) => o.flatMap((m) => r.map((p) => t(f, m, p, d))));
    u(() => {
      c.forEach((f) => f());
    });
  }, { flush: "post" });
}
// @__NO_SIDE_EFFECTS__
function ia() {
  const e = /* @__PURE__ */ mn(!1), t = jt();
  return t && Ke(() => {
    e.value = !0;
  }, t), e;
}
// @__NO_SIDE_EFFECTS__
function ov(e) {
  const t = /* @__PURE__ */ ia();
  return q(() => (t.value, !!e()));
}
function rv(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function la(...e) {
  let t, n, s = {};
  e.length === 3 ? (t = e[0], n = e[1], s = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], s = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const { target: o = jo, eventName: r = "keydown", passive: i = !1, dedupe: l = !1 } = s, u = rv(t);
  return Ft(o, r, (c) => {
    c.repeat && We(l) || u(c) && n(c);
  }, i);
}
function iv(e, t = {}) {
  const { immediate: n = !0, fpsLimit: s = null, window: o = jo, once: r = !1 } = t, i = /* @__PURE__ */ mn(!1), l = q(() => {
    const p = We(s);
    return p ? 1e3 / p : null;
  });
  let u = 0, d = null;
  function c(p) {
    if (!i.value || !o) return;
    u || (u = p);
    const g = p - u;
    if (l.value && g < l.value) {
      d = o.requestAnimationFrame(c);
      return;
    }
    if (u = p, e({
      delta: g,
      timestamp: p
    }), r) {
      i.value = !1, d = null;
      return;
    }
    d = o.requestAnimationFrame(c);
  }
  function f() {
    !i.value && o && (i.value = !0, u = 0, d = o.requestAnimationFrame(c));
  }
  function m() {
    i.value = !1, d != null && o && (o.cancelAnimationFrame(d), d = null);
  }
  return n && f(), ks(m), {
    isActive: /* @__PURE__ */ Bn(i),
    pause: m,
    resume: f
  };
}
function lv(e) {
  return JSON.parse(JSON.stringify(e));
}
function cf(e, t, n = {}) {
  const { window: s = jo, ...o } = n;
  let r;
  const i = /* @__PURE__ */ ov(() => s && "ResizeObserver" in s), l = () => {
    r && (r.disconnect(), r = void 0);
  }, u = ve(q(() => {
    const c = We(e);
    return Array.isArray(c) ? c.map((f) => It(f)) : [It(c)];
  }), (c) => {
    if (l(), i.value && s) {
      r = new ResizeObserver(t);
      for (const f of c) f && r.observe(f, o);
    }
  }, {
    immediate: !0,
    flush: "post"
  }), d = () => {
    l(), u();
  };
  return ks(d), {
    isSupported: i,
    stop: d
  };
}
// @__NO_SIDE_EFFECTS__
function Rt(e, t, n, s = {}) {
  var o, r;
  const { clone: i = !1, passive: l = !1, eventName: u, deep: d = !1, defaultValue: c, shouldEmit: f } = s, m = jt(), p = n || m?.emit || (m == null || (o = m.$emit) === null || o === void 0 ? void 0 : o.bind(m)) || (m == null || (r = m.proxy) === null || r === void 0 || (r = r.$emit) === null || r === void 0 ? void 0 : r.bind(m?.proxy));
  let g = u;
  t || (t = "modelValue"), g = g || `update:${t.toString()}`;
  const b = (y) => i ? typeof i == "function" ? i(y) : lv(y) : y, w = () => Wg(e[t]) ? b(e[t]) : c, x = (y) => {
    f ? f(y) && p(g, y) : p(g, y);
  };
  if (l) {
    const y = /* @__PURE__ */ B(w());
    let v = !1;
    return ve(() => e[t], (C) => {
      v || (v = !0, y.value = b(C), Ue(() => v = !1));
    }), ve(y, (C) => {
      !v && (C !== e[t] || d) && x(C);
    }, { deep: d }), y;
  } else return q({
    get() {
      return w();
    },
    set(y) {
      x(y);
    }
  });
}
function aa(e) {
  return e ? e.flatMap((t) => t.type === W ? aa(t.children) : [t]) : [];
}
const av = ["INPUT", "TEXTAREA"];
function Su(e, t, n, s = {}) {
  if (!t || s.enableIgnoredElement && av.includes(t.nodeName)) return null;
  const { arrowKeyOptions: o = "both", attributeName: r = "[data-reka-collection-item]", itemsArray: i = [], loop: l = !0, dir: u = "ltr", preventScroll: d = !0, focus: c = !1 } = s, [f, m, p, g, b, w] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ], x = p || g, y = f || m;
  if (!b && !w && (!x && !y || o === "vertical" && y || o === "horizontal" && x)) return null;
  const v = n ? Array.from(n.querySelectorAll(r)) : i;
  if (!v.length) return null;
  d && e.preventDefault();
  let C = null;
  return y || x ? C = ff(v, t, {
    goForward: x ? g : u === "ltr" ? f : m,
    loop: l
  }) : b ? C = v.at(0) || null : w && (C = v.at(-1) || null), c && C?.focus(), C;
}
function ff(e, t, n, s = e.includes(t) ? e.length : e.length + 1) {
  if (--s === 0) return null;
  const o = e.indexOf(t);
  let r;
  if (o === -1 ? r = n.goForward ? 0 : e.length - 1 : r = n.goForward ? o + 1 : o - 1, !n.loop && (r < 0 || r >= e.length)) return null;
  const i = (r + e.length) % e.length, l = e[i];
  return l ? l.hasAttribute("disabled") && l.getAttribute("disabled") !== "false" ? ff(e, l, n, s) : l : null;
}
const [Ws] = /* @__PURE__ */ Ye("ConfigProvider"), qr = /* @__PURE__ */ new WeakMap();
function pf(e, t) {
  let n = qr.get(e);
  n || (n = {
    owners: /* @__PURE__ */ new Set(),
    original: e.body.style.pointerEvents
  }, qr.set(e, n)), n.owners.add(t), e.body.style.pointerEvents = "none";
}
function mf(e, t) {
  const n = qr.get(e);
  n?.owners.delete(t) && n.owners.size === 0 && (qr.delete(e), e.body.style.pointerEvents = n.original);
}
function Hi(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function wl(e, t, n = ".", s) {
  if (!Hi(t))
    return wl(e, {}, n, s);
  const o = { ...t };
  for (const r of Object.keys(e)) {
    if (r === "__proto__" || r === "constructor")
      continue;
    const i = e[r];
    i != null && (s && s(o, r, i, n) || (Array.isArray(i) && Array.isArray(o[r]) ? o[r] = [...i, ...o[r]] : Hi(i) && Hi(o[r]) ? o[r] = wl(
      i,
      o[r],
      (n ? `${n}.` : "") + r.toString(),
      s
    ) : o[r] = i));
  }
  return o;
}
function uv(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, s) => wl(n, s, "", e), {})
  );
}
const hf = uv(), $u = /* @__PURE__ */ Symbol("useBodyScrollLock"), dv = /* @__PURE__ */ uf(() => {
  const e = /* @__PURE__ */ B(/* @__PURE__ */ new Map()), t = /* @__PURE__ */ B(), n = q(() => {
    for (const i of e.value.values()) if (i) return !0;
    return !1;
  }), s = Ws({ scrollBody: /* @__PURE__ */ B(!0) });
  let o = null;
  const r = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", mf(document, $u), document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Cu && o?.(), t.value = void 0;
  };
  return ve(n, (i, l) => {
    if (!$t) return;
    if (!i) {
      l && r();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const u = window.innerWidth - document.documentElement.clientWidth, d = {
      padding: u,
      margin: 0
    }, c = s.scrollBody?.value ? typeof s.scrollBody.value == "object" ? hf({
      padding: s.scrollBody.value.padding === !0 ? u : s.scrollBody.value.padding,
      margin: s.scrollBody.value.margin === !0 ? u : s.scrollBody.value.margin
    }, d) : d : {
      padding: 0,
      margin: 0
    };
    u > 0 && (document.body.style.paddingRight = typeof c.padding == "number" ? `${c.padding}px` : String(c.padding), document.body.style.marginRight = typeof c.margin == "number" ? `${c.margin}px` : String(c.margin), document.documentElement.style.setProperty("--scrollbar-width", `${u}px`), document.body.style.overflow = "hidden"), Cu && (o = Ft(document, "touchmove", (f) => cv(f), { passive: !1 })), Ue(() => {
      n.value && (pf(document, $u), document.body.style.overflow = "hidden");
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), e;
});
function ua(e) {
  const t = Math.random().toString(36).substring(2, 7), n = dv();
  n.value.set(t, e ?? !1);
  const s = q({
    get: () => n.value.get(t) ?? !1,
    set: (o) => n.value.set(t, o)
  });
  return tv(() => {
    n.value.delete(t);
  }), s;
}
function gf(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
  {
    const n = e.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : gf(n);
  }
}
function cv(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && gf(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
const fv = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Bopomofo}]/u, pv = /android/i;
function mv() {
  return typeof navigator < "u" && pv.test(navigator.userAgent);
}
function hv(e) {
  const t = /* @__PURE__ */ B(!1), n = /* @__PURE__ */ B(!0), s = /* @__PURE__ */ B(!1), o = q(() => t.value && n.value);
  function r() {
    t.value = !0, n.value = !0, s.value = !1;
  }
  function i(u) {
    u.data && (fv.test(u.data) ? (n.value = !0, s.value = !0) : mv() && !s.value && (n.value = !1));
  }
  function l(u) {
    Ue(() => {
      t.value = !1;
    });
  }
  return {
    isComposing: t,
    shouldDeferInput: o,
    handleCompositionStart: r,
    handleCompositionUpdate: i,
    handleCompositionEnd: l
  };
}
function _s(e) {
  const t = Ws({ dir: /* @__PURE__ */ B("ltr") });
  return q(() => e?.value || t.dir?.value || "ltr");
}
function Ko(e) {
  const t = jt(), n = t?.type.emits, s = {};
  return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((o) => {
    s[yo(pt(o))] = (...r) => e(o, ...r);
  }), s;
}
let Ui = 0;
function vf() {
  kt((e) => {
    if (!$t) return;
    const t = document.querySelectorAll("[data-reka-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", t[0] ?? Eu()), document.body.insertAdjacentElement("beforeend", t[1] ?? Eu()), Ui++, e(() => {
      Ui === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((n) => n.remove()), Ui--;
    });
  });
}
function Eu() {
  const e = document.createElement("span");
  return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function Gs(e) {
  return q(() => We(e) ? !!It(e)?.closest("form") : !0);
}
function fe() {
  const e = jt(), t = /* @__PURE__ */ B(), n = q(() => s());
  fh(() => {
    n.value !== s() && Km(t);
  });
  function s() {
    return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : It(t);
  }
  const o = Object.assign({}, e.exposed), r = {};
  for (const l in e.props) Object.defineProperty(r, l, {
    enumerable: !0,
    configurable: !0,
    get: () => e.props[l]
  });
  if (Object.keys(o).length > 0) for (const l in o) Object.defineProperty(r, l, {
    enumerable: !0,
    configurable: !0,
    get: () => o[l]
  });
  Object.defineProperty(r, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = r;
  function i(l) {
    if (t.value = l, !!l && (Object.defineProperty(r, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => l instanceof Element ? l : l.$el
    }), !(l instanceof Element) && !Object.hasOwn(l, "$el"))) {
      const u = l.$.exposed, d = Object.assign({}, r);
      for (const c in u) Object.defineProperty(d, c, {
        enumerable: !0,
        configurable: !0,
        get: () => u[c]
      });
      e.exposed = d;
    }
  }
  return {
    forwardRef: i,
    currentRef: t,
    currentElement: n
  };
}
function Ys(e) {
  const t = jt(), n = Object.keys(t?.type.props ?? {}).reduce((o, r) => {
    const i = (t?.type.props[r]).default;
    return i !== void 0 && (o[r] = i), o;
  }, {}), s = /* @__PURE__ */ vc(e);
  return q(() => {
    const o = {}, r = t?.vnode.props ?? {};
    return Object.keys(r).forEach((i) => {
      o[pt(i)] = r[i];
    }), Object.keys({
      ...n,
      ...o
    }).reduce((i, l) => (s.value[l] !== void 0 && (i[l] = s.value[l]), i), {});
  });
}
function Xs(e, t) {
  const n = Ys(e), s = t ? Ko(t) : {};
  return q(() => ({
    ...n.value,
    ...s
  }));
}
function da() {
  const e = jt()?.vnode?.scopeId;
  return e ? { [e]: "" } : {};
}
function gv(e, t) {
  const n = df(!1, 300);
  ks(() => {
    n.value = !1;
  });
  const s = /* @__PURE__ */ B(null), o = /* @__PURE__ */ af();
  function r() {
    s.value = null, n.value = !1;
  }
  function i(l, u) {
    if (!u) return;
    const d = l.currentTarget, c = {
      x: l.clientX,
      y: l.clientY
    }, f = vv(c, d.getBoundingClientRect()), m = yv(c, f, 1), p = bv(u.getBoundingClientRect()), g = wv([...m, ...p]);
    s.value = g, n.value = !0;
  }
  return kt((l) => {
    if (e.value && t.value) {
      const u = e.value, d = t.value, c = (m) => i(m, d), f = (m) => i(m, u);
      u.addEventListener("pointerleave", c), d.addEventListener("pointerleave", f), l(() => {
        u.removeEventListener("pointerleave", c), d.removeEventListener("pointerleave", f);
      });
    }
  }), kt((l) => {
    if (s.value) {
      const u = (c) => {
        if (!s.value || !(c.target instanceof Element)) return;
        const f = c.target, m = {
          x: c.clientX,
          y: c.clientY
        }, p = e.value?.contains(f) || t.value?.contains(f), g = !xv(m, s.value), b = !!f.closest("[data-grace-area-trigger]");
        p ? r() : (g || b) && (r(), o.trigger());
      }, d = e.value?.ownerDocument;
      d?.addEventListener("pointermove", u), l(() => d?.removeEventListener("pointermove", u));
    }
  }), {
    isPointerInTransit: n,
    onPointerExit: o.on
  };
}
function vv(e, t) {
  const n = Math.abs(t.top - e.y), s = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), r = Math.abs(t.left - e.x);
  switch (Math.min(n, s, o, r)) {
    case r:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case s:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function yv(e, t, n = 5) {
  const s = [];
  switch (t) {
    case "top":
      s.push({
        x: e.x - n,
        y: e.y + n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case "bottom":
      s.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y - n
      });
      break;
    case "left":
      s.push({
        x: e.x + n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case "right":
      s.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x - n,
        y: e.y + n
      });
      break;
  }
  return s;
}
function bv(e) {
  const { top: t, right: n, bottom: s, left: o } = e;
  return [
    {
      x: o,
      y: t
    },
    {
      x: n,
      y: t
    },
    {
      x: n,
      y: s
    },
    {
      x: o,
      y: s
    }
  ];
}
function xv(e, t) {
  const { x: n, y: s } = e;
  let o = !1;
  for (let r = 0, i = t.length - 1; r < t.length; i = r++) {
    const l = t[r].x, u = t[r].y, d = t[i].x, c = t[i].y;
    u > s != c > s && n < (d - l) * (s - u) / (c - u) + l && (o = !o);
  }
  return o;
}
function wv(e) {
  const t = e.slice();
  return t.sort((n, s) => n.x < s.x ? -1 : n.x > s.x ? 1 : n.y < s.y ? -1 : n.y > s.y ? 1 : 0), kv(t);
}
function kv(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    for (; t.length >= 2; ) {
      const r = t.at(-1), i = t[t.length - 2];
      if ((r.x - i.x) * (o.y - i.y) >= (r.y - i.y) * (o.x - i.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let s = e.length - 1; s >= 0; s--) {
    const o = e[s];
    for (; n.length >= 2; ) {
      const r = n.at(-1), i = n[n.length - 2];
      if ((r.x - i.x) * (o.y - i.y) >= (r.y - i.y) * (o.x - i.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var _v = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, As = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), ir = {}, Wi = 0, yf = function(e) {
  return e && (e.host || yf(e.parentNode));
}, Cv = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var s = yf(n);
    return s && e.contains(s) ? s : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Sv = function(e, t, n, s) {
  var o = Cv(t, Array.isArray(e) ? e : [e]);
  ir[n] || (ir[n] = /* @__PURE__ */ new WeakMap());
  var r = ir[n], i = [], l = /* @__PURE__ */ new Set(), u = new Set(o), d = function(f) {
    !f || l.has(f) || (l.add(f), d(f.parentNode));
  };
  o.forEach(d);
  var c = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(m) {
      if (l.has(m))
        c(m);
      else
        try {
          var p = m.getAttribute(s), g = p !== null && p !== "false", b = (As.get(m) || 0) + 1, w = (r.get(m) || 0) + 1;
          As.set(m, b), r.set(m, w), i.push(m), b === 1 && g && rr.set(m, !0), w === 1 && m.setAttribute(n, "true"), g || m.setAttribute(s, "true");
        } catch (x) {
          console.error("aria-hidden: cannot operate on ", m, x);
        }
    });
  };
  return c(t), l.clear(), Wi++, function() {
    i.forEach(function(f) {
      var m = As.get(f) - 1, p = r.get(f) - 1;
      As.set(f, m), r.set(f, p), m || (rr.has(f) || f.removeAttribute(s), rr.delete(f)), p || f.removeAttribute(n);
    }), Wi--, Wi || (As = /* @__PURE__ */ new WeakMap(), As = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), ir = {});
  };
}, $v = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var s = Array.from(Array.isArray(e) ? e : [e]), o = _v(e);
  return o ? (s.push.apply(s, Array.from(o.querySelectorAll("[aria-live], script"))), Sv(s, o, n, "aria-hidden")) : function() {
    return null;
  };
};
function ca(e) {
  let t;
  ve(() => It(e), (n) => {
    let s = !1;
    try {
      s = !!n?.closest("[popover]:not(:popover-open)");
    } catch {
    }
    n && !s ? t = $v(n) : t && t();
  }), hn(() => {
    t && t();
  });
}
function Xn(e, t = "reka") {
  let n;
  const s = Ws({ useId: void 0 });
  return s.useId ? n = s.useId() : n = Ac?.(), t ? `${t}-${n}` : n;
}
function Ev() {
  return {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    SPACE_CODE: "Space"
  };
}
function Tv(e) {
  const t = Ws({ locale: /* @__PURE__ */ B("en") });
  return q(() => e?.value || t.locale?.value || "en");
}
function bf(e) {
  const t = /* @__PURE__ */ B(), n = q(() => t.value?.width ?? 0), s = q(() => t.value?.height ?? 0);
  let o;
  return Ke(() => {
    const r = It(e);
    r ? (t.value = {
      width: r.offsetWidth,
      height: r.offsetHeight
    }, o = new ResizeObserver((i) => {
      if (!Array.isArray(i) || !i.length) return;
      const l = i[0];
      let u, d;
      if ("borderBoxSize" in l) {
        const c = l.borderBoxSize, f = Array.isArray(c) ? c[0] : c;
        u = f.inlineSize, d = f.blockSize;
      } else
        u = r.offsetWidth, d = r.offsetHeight;
      t.value = {
        width: u,
        height: d
      };
    }), o.observe(r, { box: "border-box" })) : t.value = void 0;
  }), hn(() => {
    o?.disconnect(), o = void 0;
  }), {
    width: n,
    height: s
  };
}
function Av(e, t) {
  const n = /* @__PURE__ */ B(e);
  function s(r) {
    return t[n.value][r] ?? n.value;
  }
  return {
    state: n,
    dispatch: (r) => {
      n.value = s(r);
    }
  };
}
function fa(e) {
  const t = df("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (o, r) => {
      t.value = t.value + o;
      {
        const i = Ge(), l = r.map((m) => ({
          ...m,
          textValue: m.value?.textValue ?? m.ref.textContent?.trim() ?? ""
        })), u = l.find((m) => m.ref === i), d = l.map((m) => m.textValue), c = Pv(d, t.value, u?.textValue), f = l.find((m) => m.textValue === c);
        return f && f.ref.focus(), f?.ref;
      }
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function xf(e, t) {
  return e.map((n, s) => e[(t + s) % e.length]);
}
function Pv(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, r = n ? e.indexOf(n) : -1;
  let i = xf(e, Math.max(r, 0));
  o.length === 1 && (i = i.filter((d) => d !== n));
  const u = i.find((d) => d.toLowerCase().startsWith(o.toLowerCase()));
  return u !== n ? u : void 0;
}
function Ov(e, t) {
  const n = /* @__PURE__ */ B({}), s = /* @__PURE__ */ B("none"), o = /* @__PURE__ */ B(e), r = e.value ? "mounted" : "unmounted";
  let i;
  const l = t.value?.ownerDocument.defaultView ?? jo, { state: u, dispatch: d } = Av(r, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), c = (w) => {
    if ($t) {
      const x = new CustomEvent(w, {
        bubbles: !1,
        cancelable: !1
      });
      t.value?.dispatchEvent(x);
    }
  };
  ve(e, async (w, x) => {
    const y = x !== w;
    if (await Ue(), y) {
      const v = s.value, C = lr(t.value);
      w ? (d("MOUNT"), c("enter"), C === "none" && c("after-enter")) : C === "none" || C === "undefined" || n.value?.display === "none" ? (d("UNMOUNT"), c("leave"), c("after-leave")) : x && v !== C ? (d("ANIMATION_OUT"), c("leave")) : (d("UNMOUNT"), c("after-leave"));
    }
  }, { immediate: !0 });
  const f = (w) => {
    if (w.target !== t.value) return;
    const x = lr(t.value), y = x.includes(CSS.escape(w.animationName)), v = u.value === "mounted" ? "enter" : "leave";
    if (y && (c(`after-${v}`), d("ANIMATION_END"), !o.value)) {
      const C = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = l?.setTimeout(() => {
        t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = C);
      });
    }
    x === "none" && d("ANIMATION_END");
  }, m = (w) => {
    w.target === t.value && (s.value = lr(t.value));
  }, p = ve(t, (w, x) => {
    w ? (n.value = getComputedStyle(w), w.addEventListener("animationstart", m), w.addEventListener("animationcancel", f), w.addEventListener("animationend", f)) : (d("ANIMATION_END"), i !== void 0 && l?.clearTimeout(i), x?.removeEventListener("animationstart", m), x?.removeEventListener("animationcancel", f), x?.removeEventListener("animationend", f));
  }, { immediate: !0 }), g = ve(u, () => {
    const w = lr(t.value);
    s.value = u.value === "mounted" ? w : "none";
  });
  return hn(() => {
    p(), g(), t.value && (t.value.removeEventListener("animationstart", m), t.value.removeEventListener("animationcancel", f), t.value.removeEventListener("animationend", f)), i !== void 0 && l?.clearTimeout(i);
  }), { isPresent: q(() => ["mounted", "unmountSuspended"].includes(u.value)) };
}
function lr(e) {
  return e && getComputedStyle(e).animationName || "none";
}
var Cs = /* @__PURE__ */ V({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    const { present: s, forceMount: o } = /* @__PURE__ */ it(e), r = /* @__PURE__ */ B(), { isPresent: i } = Ov(s, r);
    n({ present: i });
    let l = t.default({ present: i.value });
    l = aa(l || []);
    const u = jt();
    if (l && l?.length > 1) {
      const d = u?.parent?.type.name ? `<${u.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((c) => `  - ${c}`).join(`
`)
      ].join(`
`));
    }
    return () => o.value || s.value || i.value ? Sn(t.default({ present: i.value })[0], { ref: (d) => {
      const c = It(d);
      return typeof c?.hasAttribute > "u" || (c?.hasAttribute("data-reka-popper-content-wrapper") ? r.value = c.firstElementChild : r.value = c), c;
    } }) : null;
  }
});
const kl = /* @__PURE__ */ V({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      if (!n.default) return null;
      const s = aa(n.default()), o = s.findIndex((u) => u.type !== qt);
      if (o === -1) return s;
      const r = s[o];
      delete r.props?.ref;
      const i = r.props ? ue(t, r.props) : t, l = gs({
        ...r,
        props: {}
      }, i);
      return s.length === 1 ? l : (s[o] = l, s);
    };
  }
}), Mv = [
  "area",
  "img",
  "input"
], xe = /* @__PURE__ */ V({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const s = e.asChild ? "template" : e.as;
    return typeof s == "string" && Mv.includes(s) ? () => Sn(s, t) : s !== "template" ? () => Sn(e.as, t, { default: n.default }) : () => Sn(kl, t, { default: n.default });
  }
});
function vs() {
  const e = /* @__PURE__ */ B(), t = q(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : It(e));
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function qv({ type: e, defaultValue: t, modelValue: n }) {
  const s = n || t;
  return n !== void 0 || t !== void 0 ? Array.isArray(s) ? "multiple" : "single" : e ?? "single";
}
function Iv({ type: e, defaultValue: t, modelValue: n }) {
  return e || qv({
    type: e,
    defaultValue: t,
    modelValue: n
  });
}
function Rv({ type: e, defaultValue: t }) {
  return t !== void 0 ? t : e === "single" ? void 0 : [];
}
function Dv(e, t) {
  const n = q(() => Iv(e)), s = /* @__PURE__ */ Rt(e, "modelValue", t, {
    defaultValue: Rv(e),
    passive: e.modelValue === void 0,
    deep: !0
  });
  function o(i) {
    if (n.value === "single") s.value = qo(i, s.value) ? void 0 : i;
    else {
      const l = Array.isArray(s.value) ? [...s.value || []] : [s.value].filter(Boolean);
      if (lf(l, i)) {
        const u = l.findIndex((d) => qo(d, i));
        l.splice(u, 1);
      } else l.push(i);
      s.value = l;
    }
  }
  const r = q(() => n.value === "single");
  return {
    modelValue: s,
    changeModelValue: o,
    isSingle: r
  };
}
const [Mn, Fv] = /* @__PURE__ */ Ye("DialogRoot");
var Bv = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    },
    unmountOnHide: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = /* @__PURE__ */ Rt(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), r = /* @__PURE__ */ B(), i = /* @__PURE__ */ B(), { modal: l, unmountOnHide: u } = /* @__PURE__ */ it(n);
    return Fv({
      open: o,
      modal: l,
      unmountOnHide: u,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (d) => {
        o.value = d;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: r,
      contentElement: i
    }), (d, c) => G(d.$slots, "default", {
      open: a(o),
      close: () => o.value = !1
    });
  }
}), Nv = Bv, Vv = /* @__PURE__ */ V({
  __name: "DialogClose",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e;
    fe();
    const n = Mn();
    return (s, o) => (h(), D(a(xe), ue(t, {
      type: e.as === "button" ? "button" : void 0,
      onClick: o[0] || (o[0] = (r) => a(n).onOpenChange(!1))
    }), {
      default: E(() => [G(s.$slots, "default")]),
      _: 3
    }, 16, ["type"]));
  }
}), Lv = Vv;
const zv = "dismissableLayer.pointerDownOutside", jv = "dismissableLayer.focusOutside";
function Kv(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = e.ownerDocument?.defaultView;
  return typeof Element < "u" && e instanceof Element || !!t && e instanceof t.Element;
}
function wf(e, t) {
  if (!Kv(t)) return !1;
  if (e.contains(t)) return !0;
  const n = t.closest("[data-dismissable-layer]"), s = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), o = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(n && (s === n || o.indexOf(s) < o.indexOf(n)));
}
function Hv(e, t, n = !0) {
  const s = /* @__PURE__ */ B(!1), o = /* @__PURE__ */ B(() => {
  });
  return kt((r) => {
    if (!$t || !We(n)) return;
    const i = t?.value?.ownerDocument ?? globalThis.document, l = async (d) => {
      const c = d.target;
      if (!(!t?.value || !c)) {
        if (wf(t.value, c)) {
          i.removeEventListener("click", o.value), s.value = !1;
          return;
        }
        if (d.target && !s.value) {
          let m = function() {
            sa(zv, e, f);
          };
          const f = { originalEvent: d };
          d.pointerType === "touch" ? (i.removeEventListener("click", o.value), o.value = m, i.addEventListener("click", o.value, { once: !0 })) : m();
        } else i.removeEventListener("click", o.value);
        s.value = !1;
      }
    }, u = window.setTimeout(() => {
      i.addEventListener("pointerdown", l);
    }, 0);
    r(() => {
      window.clearTimeout(u), i.removeEventListener("pointerdown", l), i.removeEventListener("click", o.value);
    });
  }), { onPointerDownCapture: () => {
    We(n) && (s.value = !0);
  } };
}
function Uv(e, t, n = !0) {
  const s = /* @__PURE__ */ B(!1);
  return kt((o) => {
    if (!$t || !We(n)) return;
    const r = t?.value?.ownerDocument ?? globalThis.document, i = async (l) => {
      if (!t?.value) return;
      await Ue(), await Ue();
      const u = l.target;
      !t.value || !u || wf(t.value, u) || l.target && !s.value && sa(jv, e, { originalEvent: l });
    };
    r.addEventListener("focusin", i), o(() => r.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => {
      We(n) && (s.value = !0);
    },
    onBlurCapture: () => {
      We(n) && (s.value = !1);
    }
  };
}
const en = /* @__PURE__ */ Vt({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var Wv = /* @__PURE__ */ V({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    present: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, { forwardRef: o, currentElement: r } = fe(), i = q(() => r.value?.ownerDocument ?? globalThis.document), l = q(() => en.layersRoot), u = q(() => r.value ? Array.from(l.value).indexOf(r.value) : -1), d = q(() => en.layersWithOutsidePointerEventsDisabled.size > 0), c = q(() => {
      const p = Array.from(l.value), [g] = [...en.layersWithOutsidePointerEventsDisabled].slice(-1), b = p.indexOf(g);
      return u.value >= b;
    }), f = Hv(async (p) => {
      const g = [...en.branches].some((b) => b?.contains(p.target));
      !n.present || !c.value || g || (s("pointerDownOutside", p), s("interactOutside", p), await Ue(), p.defaultPrevented || s("dismiss"));
    }, r, () => n.present), m = Uv((p) => {
      const g = [...en.branches].some((b) => b?.contains(p.target));
      !n.present || g || (s("focusOutside", p), s("interactOutside", p), p.defaultPrevented || s("dismiss"));
    }, r);
    return la("Escape", (p) => {
      !n.present || !(u.value === l.value.size - 1) || (s("escapeKeyDown", p), p.defaultPrevented || s("dismiss"));
    }, { target: () => i.value?.defaultView ?? globalThis.window }), ve([
      r,
      () => n.disableOutsidePointerEvents,
      () => n.present
    ], ([p, g, b], w, x) => {
      if (!(!p || !b) && g) {
        const y = p.ownerDocument;
        pf(y, p), en.layersWithOutsidePointerEventsDisabled.add(p), x(() => {
          en.layersWithOutsidePointerEventsDisabled.delete(p), mf(y, p);
        });
      }
    }, { immediate: !0 }), ve([r, () => n.present], ([p, g], b, w) => {
      !p || !g || (l.value.add(p), w(() => {
        l.value.delete(p);
      }));
    }, { immediate: !0 }), kt((p) => {
      p(() => {
        r.value && (l.value.delete(r.value), en.layersWithOutsidePointerEventsDisabled.delete(r.value));
      });
    }), (p, g) => (h(), D(a(xe), {
      ref: a(o),
      "as-child": e.asChild,
      as: e.as,
      "data-dismissable-layer": "",
      style: Ie({ pointerEvents: d.value ? c.value ? "auto" : "none" : void 0 }),
      onFocusCapture: a(m).onFocusCapture,
      onBlurCapture: a(m).onBlurCapture,
      onPointerdownCapture: a(f).onPointerDownCapture
    }, {
      default: E(() => [G(p.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "style",
      "onFocusCapture",
      "onBlurCapture",
      "onPointerdownCapture"
    ]));
  }
}), hi = Wv, Gv = /* @__PURE__ */ V({
  __name: "DismissableLayerBranch",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: s } = fe();
    let o = null;
    return Ke(() => {
      o = s.value, o && en.branches.add(o);
    }), hn(() => {
      o && (en.branches.delete(o), o = null);
    }), (r, i) => (h(), D(a(xe), ue({ ref: a(n) }, t), {
      default: E(() => [G(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Yv = Gv;
const Xv = /* @__PURE__ */ Ug(() => /* @__PURE__ */ B([]));
function Jv() {
  const e = Xv();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && n?.pause(), e.value = Tu(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      e.value = Tu(e.value, t), e.value[0]?.resume();
    }
  };
}
function Tu(e, t) {
  const n = [...e], s = n.indexOf(t);
  return s !== -1 && n.splice(s, 1), n;
}
const Gi = "focusScope.autoFocusOnMount", Yi = "focusScope.autoFocusOnUnmount", Au = {
  bubbles: !1,
  cancelable: !0
};
function Zv(e, t) {
  let n = t;
  for (; n; ) {
    if (e.contains(n)) return !0;
    n = n.getRootNode().host ?? null;
  }
  return !1;
}
function br(e, { select: t = !1 } = {}) {
  const n = Ge();
  for (const s of e)
    if (bn(s, { select: t }), Ge() !== n) return !0;
}
function Qv(e) {
  const t = pa(e), n = Pu(t, e), s = Pu(t.reverse(), e);
  return [n, s];
}
function pa(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (s) => {
    const o = s.tagName === "INPUT" && s.type === "hidden";
    return s.disabled || s.hidden || o ? NodeFilter.FILTER_SKIP : s.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t.sort((s, o) => s.tabIndex === o.tabIndex ? 0 : s.tabIndex === 0 ? 1 : o.tabIndex === 0 ? -1 : s.tabIndex - o.tabIndex);
}
function Pu(e, t) {
  for (const n of e) if (!ey(n, { upTo: t })) return n;
}
function ey(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ty(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function bn(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = Ge();
    e.focus({ preventScroll: !0 }), e !== n && ty(e) && t && e.select();
  }
}
var ny = /* @__PURE__ */ V({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    trapped: {
      type: Boolean,
      required: !1,
      default: !1
    },
    present: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, s = t, { currentRef: o, currentElement: r } = fe(), i = /* @__PURE__ */ B(null), l = Jv(), u = /* @__PURE__ */ Vt({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    kt((f) => {
      if (!$t) return;
      const m = r.value;
      if (!n.trapped) return;
      const p = m?.ownerDocument ?? document, g = m ? m.getRootNode() : p;
      function b(C) {
        if (u.paused || !m) return;
        const F = C.target;
        m.contains(F) ? i.value = F : bn(i.value, { select: !0 });
      }
      function w(C) {
        if (u.paused || !m) return;
        const F = C.relatedTarget;
        F !== null && (m.contains(F) || bn(i.value, { select: !0 }));
      }
      function x(C) {
        const F = i.value;
        if (F === null || !C.some((M) => M.removedNodes.length > 0)) return;
        const S = Ge();
        if (S && m.contains(S)) return;
        m.contains(F) || bn(m);
      }
      function y(C) {
        if (u.paused || !m) return;
        const F = C.composedPath()[0];
        Zv(m, F) || bn(i.value, { select: !0 });
      }
      g.addEventListener("focusin", b), g.addEventListener("focusout", w), g !== p && p.addEventListener("focusin", y);
      const v = new MutationObserver(x);
      m && v.observe(m, {
        childList: !0,
        subtree: !0
      }), f(() => {
        g.removeEventListener("focusin", b), g.removeEventListener("focusout", w), g !== p && p.removeEventListener("focusin", y), v.disconnect();
      });
    });
    function d(f, m) {
      const p = new CustomEvent(Gi, Au), g = (b) => s("mountAutoFocus", b);
      f.addEventListener(Gi, g), f.dispatchEvent(p), f.removeEventListener(Gi, g), p.defaultPrevented || (br(pa(f), { select: !0 }), Ge() === m && bn(f));
    }
    kt(async (f) => {
      const m = r.value;
      if (await Ue(), !m) return;
      n.present !== !1 && l.add(u);
      const p = Ge();
      !m.contains(p) && n.present !== !1 && d(m, p), f(() => {
        const b = new CustomEvent(Yi, Au), w = (x) => {
          s("unmountAutoFocus", x);
        };
        m.addEventListener(Yi, w), m.dispatchEvent(b), m.setAttribute("data-focus-scope-unmounting", ""), setTimeout(() => {
          b.defaultPrevented || bn(p ?? document.body, { select: !0 }), m.removeEventListener(Yi, w), l.remove(u), m.removeAttribute("data-focus-scope-unmounting");
        }, 0);
      });
    }), ve(() => n.present, async (f, m) => {
      if (!$t) return;
      if (f === !1 && m === !0) {
        l.remove(u);
        return;
      }
      if (f !== !0 || m !== !1) return;
      l.add(u), await Ue();
      const p = r.value;
      if (!p) return;
      const g = Ge();
      p.contains(g) || d(p, g);
    });
    function c(f) {
      if (!n.loop && !n.trapped || u.paused) return;
      const m = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, p = Ge();
      if (m && p) {
        const g = f.currentTarget, [b, w] = Qv(g);
        b && w ? !f.shiftKey && p === w ? (f.preventDefault(), n.loop && bn(b, { select: !0 })) : f.shiftKey && p === b && (f.preventDefault(), n.loop && bn(w, { select: !0 })) : p === g && f.preventDefault();
      }
    }
    return (f, m) => (h(), D(a(xe), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": e.asChild,
      as: e.as,
      onKeydown: c
    }, {
      default: E(() => [G(f.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), ma = ny;
const sy = "menu.itemSelect", _l = ["Enter", " "], oy = [
  "ArrowDown",
  "PageUp",
  "Home"
], kf = [
  "ArrowUp",
  "PageDown",
  "End"
], ry = [...oy, ...kf];
[..._l], [..._l];
function _f(e) {
  return e ? "open" : "closed";
}
function iy(e) {
  const { onEntryFocus: t, onEntryFocusOnce: n, ...s } = e;
  return s;
}
function Cl(e) {
  const t = Ge();
  for (const n of e)
    if (n === t || (n.focus(), Ge() !== t)) return;
}
function ly(e, t) {
  const { x: n, y: s } = e;
  let o = !1;
  for (let r = 0, i = t.length - 1; r < t.length; i = r++) {
    const l = t[r].x, u = t[r].y, d = t[i].x, c = t[i].y;
    u > s != c > s && n < (d - l) * (s - u) / (c - u) + l && (o = !o);
  }
  return o;
}
function ay(e, t) {
  if (!t) return !1;
  const n = {
    x: e.clientX,
    y: e.clientY
  };
  return ly(n, t);
}
function Ir(e) {
  return e.pointerType === "mouse";
}
var uy = /* @__PURE__ */ V({
  __name: "DialogContentImpl",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    present: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Mn(), { forwardRef: r, currentElement: i } = fe();
    return o.titleId ||= Xn(void 0, "reka-dialog-title"), o.descriptionId ||= Xn(void 0, "reka-dialog-description"), Ke(() => {
      o.contentElement = i, Ge() !== document.body && (o.triggerElement.value = Ge());
    }), (l, u) => (h(), D(a(ma), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      present: n.present,
      onMountAutoFocus: u[5] || (u[5] = (d) => s("openAutoFocus", d)),
      onUnmountAutoFocus: u[6] || (u[6] = (d) => s("closeAutoFocus", d))
    }, {
      default: E(() => [O(a(hi), ue({
        id: a(o).contentId,
        ref: a(r),
        as: e.as,
        "as-child": e.asChild,
        present: n.present,
        "disable-outside-pointer-events": e.disableOutsidePointerEvents,
        role: "dialog",
        "aria-describedby": a(o).descriptionId,
        "aria-labelledby": a(o).titleId,
        "data-state": a(_f)(a(o).open.value)
      }, l.$attrs, {
        onDismiss: u[0] || (u[0] = (d) => a(o).onOpenChange(!1)),
        onEscapeKeyDown: u[1] || (u[1] = (d) => s("escapeKeyDown", d)),
        onFocusOutside: u[2] || (u[2] = (d) => s("focusOutside", d)),
        onInteractOutside: u[3] || (u[3] = (d) => s("interactOutside", d)),
        onPointerDownOutside: u[4] || (u[4] = (d) => s("pointerDownOutside", d))
      }), {
        default: E(() => [G(l.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "as",
        "as-child",
        "present",
        "disable-outside-pointer-events",
        "aria-describedby",
        "aria-labelledby",
        "data-state"
      ])]),
      _: 3
    }, 8, ["trapped", "present"]));
  }
}), Cf = uy, dy = /* @__PURE__ */ V({
  __name: "DialogContentModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    present: {
      type: Boolean,
      required: !0
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Mn(), r = Ko(s), { forwardRef: i, currentElement: l } = fe(), u = q(() => n.present ? l.value : void 0);
    ca(u);
    const d = q(() => {
      const { present: c, ...f } = n;
      return f;
    });
    return ve(() => n.present, (c, f) => {
      !c && f && o.triggerElement.value?.focus();
    }), (c, f) => (h(), D(Cf, ue({
      ...d.value,
      ...a(r)
    }, {
      ref: a(i),
      present: e.present,
      "trap-focus": a(o).open.value,
      "disable-outside-pointer-events": n.disableOutsidePointerEvents,
      onCloseAutoFocus: f[0] || (f[0] = (m) => {
        m.defaultPrevented || (m.preventDefault(), a(o).triggerElement.value?.focus());
      }),
      onPointerDownOutside: f[1] || (f[1] = (m) => {
        const p = m.detail.originalEvent, g = p.button === 0 && p.ctrlKey === !0;
        (p.button === 2 || g) && m.preventDefault();
      }),
      onFocusOutside: f[2] || (f[2] = (m) => {
        m.preventDefault();
      })
    }), {
      default: E(() => [G(c.$slots, "default")]),
      _: 3
    }, 16, [
      "present",
      "trap-focus",
      "disable-outside-pointer-events"
    ]));
  }
}), cy = dy, fy = /* @__PURE__ */ V({
  __name: "DialogContentNonModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    present: {
      type: Boolean,
      required: !0
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, o = Ko(t);
    fe();
    const r = Mn(), i = /* @__PURE__ */ B(!1), l = /* @__PURE__ */ B(!1), u = q(() => {
      const { present: d, ...c } = n;
      return c;
    });
    return ve(() => n.present, (d, c) => {
      !d && c && (i.value || r.triggerElement.value?.focus(), i.value = !1, l.value = !1);
    }), (d, c) => (h(), D(Cf, ue({
      ...u.value,
      ...a(o)
    }, {
      present: e.present,
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: c[0] || (c[0] = (f) => {
        f.defaultPrevented || (i.value || a(r).triggerElement.value?.focus(), f.preventDefault()), i.value = !1, l.value = !1;
      }),
      onInteractOutside: c[1] || (c[1] = (f) => {
        f.defaultPrevented || (i.value = !0, f.detail.originalEvent.type === "pointerdown" && (l.value = !0));
        const m = f.target;
        a(r).triggerElement.value?.contains(m) && f.preventDefault(), f.detail.originalEvent.type === "focusin" && l.value && f.preventDefault();
      })
    }), {
      default: E(() => [G(d.$slots, "default")]),
      _: 3
    }, 16, ["present"]));
  }
}), py = fy, my = /* @__PURE__ */ V({
  __name: "DialogContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Mn(), r = Ko(s), { forwardRef: i } = fe(), l = q(() => n.forceMount || !o.unmountOnHide.value);
    return (u, d) => (h(), D(a(Cs), {
      present: a(o).open.value,
      "force-mount": l.value
    }, {
      default: E(({ present: c }) => [a(o).modal.value ? $r((h(), D(cy, ue({
        key: 0,
        ref: a(i),
        present: l.value ? c : !0
      }, {
        ...n,
        ...a(r),
        ...u.$attrs
      }), {
        default: E(() => [G(u.$slots, "default")]),
        _: 3
      }, 16, ["present"])), [[yl, e.forceMount || a(o).unmountOnHide.value || c]]) : $r((h(), D(py, ue({
        key: 1,
        ref: a(i),
        present: l.value ? c : !0
      }, {
        ...n,
        ...a(r),
        ...u.$attrs
      }), {
        default: E(() => [G(u.$slots, "default")]),
        _: 3
      }, 16, ["present"])), [[yl, e.forceMount || a(o).unmountOnHide.value || c]])]),
      _: 3
    }, 8, ["present", "force-mount"]));
  }
}), hy = my, gy = /* @__PURE__ */ V({
  __name: "DialogDescription",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "p"
    }
  },
  setup(e) {
    const t = e;
    fe();
    const n = Mn();
    return (s, o) => (h(), D(a(xe), ue(t, { id: a(n).descriptionId }), {
      default: E(() => [G(s.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), vy = gy, yy = /* @__PURE__ */ V({
  __name: "DialogOverlayImpl",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    present: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  setup(e) {
    const t = e, n = Mn(), s = ua(t.present);
    return ve(() => t.present, (o) => s.value = o), fe(), (o, r) => (h(), D(a(xe), {
      as: e.as,
      "as-child": e.asChild,
      "data-state": a(n).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" },
      onPointerdown: r[0] || (r[0] = Gt(() => {
      }, [
        "left",
        "self",
        "prevent"
      ]))
    }, {
      default: E(() => [G(o.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state"
    ]));
  }
}), by = yy, xy = /* @__PURE__ */ V({
  __name: "DialogOverlay",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = Mn(), { forwardRef: s } = fe(), o = q(() => t.forceMount || !n.unmountOnHide.value);
    return (r, i) => a(n)?.modal.value ? (h(), D(a(Cs), {
      key: 0,
      present: a(n).open.value,
      "force-mount": o.value
    }, {
      default: E(({ present: l }) => [$r(O(by, ue(r.$attrs, {
        ref: a(s),
        as: e.as,
        "as-child": e.asChild,
        present: o.value ? l : !0
      }), {
        default: E(() => [G(r.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "present"
      ]), [[yl, e.forceMount || a(n).unmountOnHide.value || l]])]),
      _: 3
    }, 8, ["present", "force-mount"])) : Y("v-if", !0);
  }
}), wy = xy, ky = /* @__PURE__ */ V({
  __name: "Teleport",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = Ws({}), s = q(() => t.to ?? n.teleportTo?.value ?? "body"), o = /* @__PURE__ */ ia();
    return (r, i) => a(o) || e.forceMount ? (h(), D(Yl, {
      key: 0,
      to: s.value,
      disabled: e.disabled,
      defer: e.defer
    }, [G(r.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : Y("v-if", !0);
  }
}), gi = ky, _y = /* @__PURE__ */ V({
  __name: "DialogPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, s) => (h(), D(a(gi), Nt(gn(t)), {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Cy = _y, Sy = /* @__PURE__ */ V({
  __name: "DialogTitle",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "h2"
    }
  },
  setup(e) {
    const t = e, n = Mn();
    return fe(), (s, o) => (h(), D(a(xe), ue(t, { id: a(n).titleId }), {
      default: E(() => [G(s.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), $y = Sy;
const Ou = "data-reka-collection-item";
function Et(e = {}) {
  const { key: t = "", isProvider: n = !1 } = e, s = `${t}CollectionProvider`;
  let o;
  n ? (o = {
    collectionRef: /* @__PURE__ */ B(),
    itemMap: /* @__PURE__ */ B(/* @__PURE__ */ new Map())
  }, Sc(s, o)) : o = Gl(s);
  const r = (f, m = !1) => {
    if (!o.collectionRef.value) return;
    const p = o.itemMap.value.get(f);
    return p && (m || p.ref.dataset.disabled !== "") ? p : void 0;
  }, i = (f = !1) => {
    const m = o.collectionRef.value;
    if (!m) return [];
    const p = Array.from(m.querySelectorAll(`[${Ou}]`)), g = new Map(p.map((x, y) => [x, y])), w = Array.from(o.itemMap.value.values()).sort((x, y) => (g.get(x.ref) ?? -1) - (g.get(y.ref) ?? -1));
    return f ? w : w.filter((x) => x.ref.dataset.disabled !== "");
  }, l = /* @__PURE__ */ V({
    name: "CollectionSlot",
    inheritAttrs: !1,
    setup(f, { slots: m, attrs: p }) {
      const { primitiveElement: g, currentElement: b } = vs();
      return ve(b, () => {
        o.collectionRef.value = b.value;
      }), () => Sn(kl, {
        ref: g,
        ...p
      }, m);
    }
  }), u = /* @__PURE__ */ V({
    name: "CollectionItem",
    inheritAttrs: !1,
    props: { value: { validator: () => !0 } },
    setup(f, { slots: m, attrs: p }) {
      const { primitiveElement: g, currentElement: b } = vs();
      return kt((w) => {
        if (b.value) {
          const x = pc(b.value);
          o.itemMap.value.set(x, {
            ref: b.value,
            value: f.value
          }), w(() => o.itemMap.value.delete(x));
        }
      }), () => Sn(kl, {
        ...p,
        [Ou]: "",
        ref: g
      }, m);
    }
  }), d = q(() => Array.from(o.itemMap.value.values())), c = q(() => o.itemMap.value.size);
  return {
    getItems: i,
    getItem: r,
    reactiveItems: d,
    itemMapSize: c,
    CollectionSlot: l,
    CollectionItem: u
  };
}
var Ey = /* @__PURE__ */ V({
  __name: "VisuallyHidden",
  props: {
    feature: {
      type: String,
      required: !1,
      default: "focusable"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    return (t, n) => (h(), D(a(xe), {
      as: e.as,
      "as-child": e.asChild,
      "aria-hidden": e.feature === "fully-hidden" ? "true" : void 0,
      "data-hidden": e.feature === "fully-hidden" ? "" : void 0,
      tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        position: "absolute",
        border: 0,
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        top: "-1px",
        left: "-1px"
      }
    }, {
      default: E(() => [G(t.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), Ho = Ey, Ty = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const t = e, { primitiveElement: n, currentElement: s } = vs(), o = q(() => t.checked ?? t.value);
    return ve(o, (r, i) => {
      if (!s.value) return;
      const l = s.value, u = window.HTMLInputElement.prototype, c = Object.getOwnPropertyDescriptor(u, "value").set;
      if (c && r !== i) {
        const f = new Event("input", { bubbles: !0 }), m = new Event("change", { bubbles: !0 });
        c.call(l, r), l.dispatchEvent(f), l.dispatchEvent(m);
      }
    }), (r, i) => (h(), D(Ho, ue({
      ref_key: "primitiveElement",
      ref: n
    }, {
      ...t,
      ...r.$attrs
    }, { as: "input" }), null, 16));
  }
}), Mu = Ty, Ay = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const t = e, n = q(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), s = q(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
      name: t.name,
      value: t.value
    }] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((o, r) => typeof o == "object" ? Object.entries(o).map(([i, l]) => ({
      name: `${t.name}[${r}][${i}]`,
      value: l
    })) : {
      name: `${t.name}[${r}]`,
      value: o
    }) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([o, r]) => ({
      name: `${t.name}[${o}]`,
      value: r
    })) : []);
    return (o, r) => (h(), A(W, null, [Y(" We render single input if it's required "), n.value ? (h(), D(Mu, ue({ key: e.name }, {
      ...t,
      ...o.$attrs
    }, {
      name: e.name,
      value: e.value
    }), null, 16, ["name", "value"])) : (h(!0), A(W, { key: 1 }, pe(s.value, (i) => (h(), D(Mu, ue({ key: i.name }, { ref_for: !0 }, {
      ...t,
      ...o.$attrs
    }, {
      name: i.name,
      value: i.value
    }), null, 16, ["name", "value"]))), 128))], 2112));
  }
}), Uo = Ay;
const Py = "rovingFocusGroup.onEntryFocus", Oy = {
  bubbles: !1,
  cancelable: !0
}, My = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function qy(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Iy(e, t, n) {
  const s = qy(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(s)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(s)))
    return My[s];
}
function Sf(e, t = !1) {
  const n = Ge();
  for (const s of e)
    if (s === n || (s.focus({ preventScroll: t }), Ge() !== n)) return;
}
function Ry(e, t) {
  return e.map((n, s) => e[(t + s) % e.length]);
}
const [$f, Dy] = /* @__PURE__ */ Ye("PopperRoot");
var Fy = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = /* @__PURE__ */ B();
    return Dy({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, s) => G(n.$slots, "default");
  }
}), ha = Fy, By = /* @__PURE__ */ V({
  __name: "PopperAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: s } = fe(), o = $f();
    return $c(() => {
      o.onAnchorChange(t.reference ?? s.value);
    }), (r, i) => (h(), D(a(xe), {
      ref: a(n),
      as: e.as,
      "as-child": e.asChild
    }, {
      default: E(() => [G(r.$slots, "default")]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), ga = By;
function Ny(e) {
  return e !== null;
}
function Vy(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      const { placement: n, rects: s, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, l = i ? 0 : e.arrowWidth, u = i ? 0 : e.arrowHeight, [d, c] = Sl(n), f = {
        start: e.dir === "rtl" ? "100%" : "0%",
        center: "50%",
        end: e.dir === "rtl" ? "0%" : "100%"
      }[c], m = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[c], p = (o.arrow?.x ?? 0) + l / 2, g = (o.arrow?.y ?? 0) + u / 2;
      let b = "", w = "";
      return d === "bottom" ? (b = i ? f : `${p}px`, w = `${-u}px`) : d === "top" ? (b = i ? f : `${p}px`, w = `${s.floating.height + u}px`) : d === "right" ? (b = `${-u}px`, w = i ? m : `${g}px`) : d === "left" && (b = `${s.floating.width + u}px`, w = i ? m : `${g}px`), { data: {
        x: b,
        y: w
      } };
    }
  };
}
function Sl(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const Ly = ["top", "right", "bottom", "left"], Jn = Math.min, $n = Math.max, Rr = Math.round, ar = Math.floor, En = (e) => ({
  x: e,
  y: e
}), zy = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ef(e, t, n) {
  return $n(e, Jn(t, n));
}
function Pn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Zn(e) {
  return e.split("-")[0];
}
function Js(e) {
  return e.split("-")[1];
}
function va(e) {
  return e === "x" ? "y" : "x";
}
function ya(e) {
  return e === "y" ? "height" : "width";
}
function rn(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function ba(e) {
  return va(rn(e));
}
function jy(e, t, n) {
  n === void 0 && (n = !1);
  const s = Js(e), o = ba(e), r = ya(o);
  let i = o === "x" ? s === (n ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return t.reference[r] > t.floating[r] && (i = Dr(i)), [i, Dr(i)];
}
function Ky(e) {
  const t = Dr(e);
  return [$l(e), t, $l(t)];
}
function $l(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const qu = ["left", "right"], Iu = ["right", "left"], Hy = ["top", "bottom"], Uy = ["bottom", "top"];
function Wy(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Iu : qu : t ? qu : Iu;
    case "left":
    case "right":
      return t ? Hy : Uy;
    default:
      return [];
  }
}
function Gy(e, t, n, s) {
  const o = Js(e);
  let r = Wy(Zn(e), n === "start", s);
  return o && (r = r.map((i) => i + "-" + o), t && (r = r.concat(r.map($l)))), r;
}
function Dr(e) {
  const t = Zn(e);
  return zy[t] + e.slice(t.length);
}
function Yy(e) {
  var t, n, s, o;
  return {
    top: (t = e.top) != null ? t : 0,
    right: (n = e.right) != null ? n : 0,
    bottom: (s = e.bottom) != null ? s : 0,
    left: (o = e.left) != null ? o : 0
  };
}
function Tf(e) {
  return typeof e != "number" ? Yy(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Fr(e) {
  const {
    x: t,
    y: n,
    width: s,
    height: o
  } = e;
  return {
    width: s,
    height: o,
    top: n,
    left: t,
    right: t + s,
    bottom: n + o,
    x: t,
    y: n
  };
}
function Ru(e, t, n) {
  let {
    reference: s,
    floating: o
  } = e;
  const r = rn(t), i = ba(t), l = ya(i), u = Zn(t), d = r === "y", c = s.x + s.width / 2 - o.width / 2, f = s.y + s.height / 2 - o.height / 2, m = s[l] / 2 - o[l] / 2;
  let p;
  switch (u) {
    case "top":
      p = {
        x: c,
        y: s.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: c,
        y: s.y + s.height
      };
      break;
    case "right":
      p = {
        x: s.x + s.width,
        y: f
      };
      break;
    case "left":
      p = {
        x: s.x - o.width,
        y: f
      };
      break;
    default:
      p = {
        x: s.x,
        y: s.y
      };
  }
  const g = Js(t);
  return g && (p[i] += m * (g === "end" ? 1 : -1) * (n && d ? -1 : 1)), p;
}
async function Xy(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: s,
    y: o,
    platform: r,
    rects: i,
    elements: l,
    strategy: u
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: f = "floating",
    altBoundary: m = !1,
    padding: p = 0
  } = Pn(t, e), g = Tf(p), w = l[m ? f === "floating" ? "reference" : "floating" : f], x = Fr(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(w))) == null || n ? w : w.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(l.floating)),
    boundary: d,
    rootBoundary: c,
    strategy: u
  })), y = f === "floating" ? {
    x: s,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, v = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(l.floating)), C = await (r.isElement == null ? void 0 : r.isElement(v)) && await (r.getScale == null ? void 0 : r.getScale(v)) || {
    x: 1,
    y: 1
  }, F = Fr(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: y,
    offsetParent: v,
    strategy: u
  }) : y);
  return {
    top: (x.top - F.top + g.top) / C.y,
    bottom: (F.bottom - x.bottom + g.bottom) / C.y,
    left: (x.left - F.left + g.left) / C.x,
    right: (F.right - x.right + g.right) / C.x
  };
}
const Jy = 50, Zy = async (e, t, n) => {
  const {
    placement: s = "bottom",
    strategy: o = "absolute",
    middleware: r = [],
    platform: i
  } = n, l = i.detectOverflow ? i : {
    ...i,
    detectOverflow: Xy
  }, u = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let d = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: c,
    y: f
  } = Ru(d, s, u), m = s, p = 0;
  const g = {};
  for (let b = 0; b < r.length; b++) {
    const w = r[b];
    if (!w)
      continue;
    const {
      name: x,
      fn: y
    } = w, {
      x: v,
      y: C,
      data: F,
      reset: $
    } = await y({
      x: c,
      y: f,
      initialPlacement: s,
      placement: m,
      strategy: o,
      middlewareData: g,
      rects: d,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = v ?? c, f = C ?? f, g[x] = {
      ...g[x],
      ...F
    }, $ && p < Jy && (p++, typeof $ == "object" && ($.placement && (m = $.placement), $.rects && (d = $.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : $.rects), {
      x: c,
      y: f
    } = Ru(d, m, u)), b = -1);
  }
  return {
    x: c,
    y: f,
    placement: m,
    strategy: o,
    middlewareData: g
  };
}, Qy = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: s,
      placement: o,
      rects: r,
      platform: i,
      elements: l,
      middlewareData: u
    } = t, {
      element: d,
      padding: c = 0
    } = Pn(e, t) || {};
    if (d == null)
      return {};
    const f = Tf(c), m = {
      x: n,
      y: s
    }, p = ba(o), g = ya(p), b = await i.getDimensions(d), w = p === "y", x = w ? "top" : "left", y = w ? "bottom" : "right", v = w ? "clientHeight" : "clientWidth", C = r.reference[g] + r.reference[p] - m[p] - r.floating[g], F = m[p] - r.reference[p], $ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d));
    let S = $ ? $[v] : 0;
    (!S || !await (i.isElement == null ? void 0 : i.isElement($))) && (S = l.floating[v] || r.floating[g]);
    const k = C / 2 - F / 2, M = S / 2 - b[g] / 2 - 1, I = Jn(f[x], M), L = Jn(f[y], M), se = S - b[g] - L, ie = S / 2 - b[g] / 2 + k, ge = Ef(I, ie, se), H = !u.arrow && Js(o) != null && ie !== ge && r.reference[g] / 2 - (ie < I ? I : L) - b[g] / 2 < 0, J = H ? ie < I ? ie - I : ie - se : 0;
    return {
      [p]: m[p] + J,
      data: {
        [p]: ge,
        centerOffset: ie - ge - J,
        ...H && {
          alignmentOffset: J
        }
      },
      reset: H
    };
  }
}), eb = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, s;
      const {
        placement: o,
        middlewareData: r,
        rects: i,
        initialPlacement: l,
        platform: u,
        elements: d
      } = t, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: m,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: b = !0,
        ...w
      } = Pn(e, t);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const x = Zn(o), y = rn(l), v = Zn(l) === l, C = await (u.isRTL == null ? void 0 : u.isRTL(d.floating)), F = m || (v || !b ? [Dr(l)] : Ky(l)), $ = g !== "none";
      !m && $ && F.push(...Gy(l, b, g, C));
      const S = [l, ...F], k = await u.detectOverflow(t, w), M = [];
      let I = ((s = r.flip) == null ? void 0 : s.overflows) || [];
      if (c && M.push(k[x]), f) {
        const ge = jy(o, i, C);
        M.push(k[ge[0]], k[ge[1]]);
      }
      if (I = [...I, {
        placement: o,
        overflows: M
      }], !M.every((ge) => ge <= 0)) {
        var L, se;
        const ge = (((L = r.flip) == null ? void 0 : L.index) || 0) + 1, H = S[ge];
        if (H && (!(f === "alignment" ? y !== rn(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        I.every(($e) => rn($e.placement) === y ? $e.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ge,
              overflows: I
            },
            reset: {
              placement: H
            }
          };
        let J = (se = I.filter((ae) => ae.overflows[0] <= 0).sort((ae, $e) => ae.overflows[1] - $e.overflows[1])[0]) == null ? void 0 : se.placement;
        if (!J)
          switch (p) {
            case "bestFit": {
              var ie;
              const ae = (ie = I.filter(($e) => {
                if ($) {
                  const Me = rn($e.placement);
                  return Me === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Me === "y";
                }
                return !0;
              }).map(($e) => [$e.placement, $e.overflows.filter((Me) => Me > 0).reduce((Me, ne) => Me + ne, 0)]).sort(($e, Me) => $e[1] - Me[1])[0]) == null ? void 0 : ie[0];
              ae && (J = ae);
              break;
            }
            case "initialPlacement":
              J = l;
              break;
          }
        if (o !== J)
          return {
            reset: {
              placement: J
            }
          };
      }
      return {};
    }
  };
};
function Du(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Fu(e) {
  return Ly.some((t) => e[t] >= 0);
}
const tb = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n,
        platform: s
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = Pn(e, t);
      switch (o) {
        case "referenceHidden": {
          const i = await s.detectOverflow(t, {
            ...r,
            elementContext: "reference"
          }), l = Du(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: Fu(l)
            }
          };
        }
        case "escaped": {
          const i = await s.detectOverflow(t, {
            ...r,
            altBoundary: !0
          }), l = Du(i, n.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: Fu(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Af = /* @__PURE__ */ new Set(["left", "top"]);
async function nb(e, t) {
  const {
    placement: n,
    platform: s,
    elements: o
  } = e, r = await (s.isRTL == null ? void 0 : s.isRTL(o.floating)), i = Zn(n), l = Js(n), u = rn(n) === "y", d = Af.has(i) ? -1 : 1, c = r && u ? -1 : 1, f = Pn(t, e);
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: g
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return l && typeof g == "number" && (p = l === "end" ? g * -1 : g), u ? {
    x: p * c,
    y: m * d
  } : {
    x: m * d,
    y: p * c
  };
}
const sb = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, s;
      const {
        x: o,
        y: r,
        placement: i,
        middlewareData: l
      } = t, u = await nb(t, e);
      return i === ((n = l.offset) == null ? void 0 : n.placement) && (s = l.arrow) != null && s.alignmentOffset ? {} : {
        x: o + u.x,
        y: r + u.y,
        data: {
          ...u,
          placement: i
        }
      };
    }
  };
}, ob = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: s,
        placement: o,
        platform: r
      } = t, {
        mainAxis: i = !0,
        crossAxis: l = !1,
        limiter: u = {
          fn: (y) => {
            let {
              x: v,
              y: C
            } = y;
            return {
              x: v,
              y: C
            };
          }
        },
        ...d
      } = Pn(e, t), c = {
        x: n,
        y: s
      }, f = await r.detectOverflow(t, d), m = rn(o), p = va(m);
      let g = c[p], b = c[m];
      const w = (y, v) => Ef(v + f[y === "y" ? "top" : "left"], v, v - f[y === "y" ? "bottom" : "right"]);
      i && (g = w(p, g)), l && (b = w(m, b));
      const x = u.fn({
        ...t,
        [p]: g,
        [m]: b
      });
      return {
        ...x,
        data: {
          x: x.x - n,
          y: x.y - s,
          enabled: {
            [p]: i,
            [m]: l
          }
        }
      };
    }
  };
}, rb = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      var n, s;
      const {
        x: o,
        y: r,
        placement: i,
        rects: l,
        middlewareData: u
      } = t, {
        offset: d = 0,
        mainAxis: c = !0,
        crossAxis: f = !0
      } = Pn(e, t), m = {
        x: o,
        y: r
      }, p = rn(i), g = va(p);
      let b = m[g], w = m[p];
      const x = Pn(d, t), y = typeof x == "number" ? {
        mainAxis: x,
        crossAxis: 0
      } : {
        mainAxis: (n = x.mainAxis) != null ? n : 0,
        crossAxis: (s = x.crossAxis) != null ? s : 0
      };
      if (c) {
        const F = g === "y" ? "height" : "width", $ = l.reference[g] - l.floating[F] + y.mainAxis, S = l.reference[g] + l.reference[F] - y.mainAxis;
        b < $ ? b = $ : b > S && (b = S);
      }
      if (f) {
        var v, C;
        const F = g === "y" ? "width" : "height", $ = Af.has(Zn(i)), S = l.reference[p] - l.floating[F] + ($ && ((v = u.offset) == null ? void 0 : v[p]) || 0) + ($ ? 0 : y.crossAxis), k = l.reference[p] + l.reference[F] + ($ ? 0 : ((C = u.offset) == null ? void 0 : C[p]) || 0) - ($ ? y.crossAxis : 0);
        w < S ? w = S : w > k && (w = k);
      }
      return {
        [g]: b,
        [p]: w
      };
    }
  };
}, ib = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: s,
        platform: o,
        elements: r
      } = t, {
        apply: i = () => {
        },
        ...l
      } = Pn(e, t), u = await o.detectOverflow(t, l), d = Zn(n), c = Js(n), f = rn(n) === "y", {
        width: m,
        height: p
      } = s.floating;
      let g, b;
      d === "top" || d === "bottom" ? (g = d, b = c === (await (o.isRTL == null ? void 0 : o.isRTL(r.floating)) ? "start" : "end") ? "left" : "right") : (b = d, g = c === "end" ? "top" : "bottom");
      const w = p - u.top - u.bottom, x = m - u.left - u.right, y = Jn(p - u[g], w), v = Jn(m - u[b], x), C = t.middlewareData.shift, F = !C;
      let $ = y, S = v;
      C != null && C.enabled.x && (S = x), C != null && C.enabled.y && ($ = w), F && !c && (f ? S = m - 2 * $n(u.left, u.right) : $ = p - 2 * $n(u.top, u.bottom)), await i({
        ...t,
        availableWidth: S,
        availableHeight: $
      });
      const k = await o.getDimensions(r.floating);
      return m !== k.width || p !== k.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function vi() {
  return typeof window < "u";
}
function Ss(e) {
  return xa(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function St(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function qn(e) {
  var t;
  return (t = (xa(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function xa(e) {
  return vi() ? e instanceof Node || e instanceof St(e).Node : !1;
}
function cn(e) {
  return vi() ? e instanceof Element || e instanceof St(e).Element : !1;
}
function es(e) {
  return vi() ? e instanceof HTMLElement || e instanceof St(e).HTMLElement : !1;
}
function Bu(e) {
  return !vi() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof St(e).ShadowRoot;
}
function yi(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: s,
    display: o
  } = fn(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + s + n) && o !== "inline" && o !== "contents";
}
function lb(e) {
  return /^(table|td|th)$/.test(Ss(e));
}
function bi(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const ab = /transform|translate|scale|rotate|perspective|filter/, ub = /paint|layout|strict|content/, rs = (e) => !!e && e !== "none";
let Xi;
function wa(e) {
  const t = cn(e) ? fn(e) : e;
  return rs(t.transform) || rs(t.translate) || rs(t.scale) || rs(t.rotate) || rs(t.perspective) || !ka() && (rs(t.backdropFilter) || rs(t.filter)) || ab.test(t.willChange || "") || ub.test(t.contain || "");
}
function db(e) {
  let t = ys(e);
  for (; es(t) && !Io(t); ) {
    if (wa(t))
      return t;
    if (bi(t))
      return null;
    t = ys(t);
  }
  return null;
}
function ka() {
  return Xi == null && (Xi = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Xi;
}
function Io(e) {
  return /^(html|body|#document)$/.test(Ss(e));
}
function fn(e) {
  return St(e).getComputedStyle(e);
}
function xi(e) {
  return cn(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ys(e) {
  if (Ss(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Bu(e) && e.host || // Fallback.
    qn(e)
  );
  return Bu(t) ? t.host : t;
}
function Pf(e) {
  const t = ys(e);
  return Io(t) ? (e.ownerDocument || e).body : es(t) && yi(t) ? t : Pf(t);
}
function Ro(e, t, n) {
  var s;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Pf(e), r = o === ((s = e.ownerDocument) == null ? void 0 : s.body), i = St(o);
  if (r) {
    const l = El(i);
    return t.concat(i, i.visualViewport || [], yi(o) ? o : [], l && n ? Ro(l) : []);
  } else
    return t.concat(o, Ro(o, [], n));
}
function El(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Of(e) {
  const t = fn(e);
  let n = parseFloat(t.width) || 0, s = parseFloat(t.height) || 0;
  const o = es(e), r = o ? e.offsetWidth : n, i = o ? e.offsetHeight : s, l = Rr(n) !== r || Rr(s) !== i;
  return l && (n = r, s = i), {
    width: n,
    height: s,
    $: l
  };
}
function _a(e) {
  return cn(e) ? e : e.contextElement;
}
function Bs(e) {
  const t = _a(e);
  if (!es(t))
    return En(1);
  const n = t.getBoundingClientRect(), {
    width: s,
    height: o,
    $: r
  } = Of(t);
  let i = (r ? Rr(n.width) : n.width) / s, l = (r ? Rr(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: i,
    y: l
  };
}
const cb = /* @__PURE__ */ En(0);
function Mf(e) {
  const t = St(e);
  return !ka() || !t.visualViewport ? cb : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function fb(e, t, n) {
  return t === void 0 && (t = !1), !!n && t && n === St(e);
}
function bs(e, t, n, s) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), r = _a(e);
  let i = En(1);
  t && (s ? cn(s) && (i = Bs(s)) : i = Bs(e));
  const l = fb(r, n, s) ? Mf(r) : En(0);
  let u = (o.left + l.x) / i.x, d = (o.top + l.y) / i.y, c = o.width / i.x, f = o.height / i.y;
  if (r && s) {
    const m = St(r), p = cn(s) ? St(s) : s;
    let g = m, b = El(g);
    for (; b && p !== g; ) {
      const w = Bs(b), x = b.getBoundingClientRect(), y = fn(b), v = x.left + (b.clientLeft + parseFloat(y.paddingLeft)) * w.x, C = x.top + (b.clientTop + parseFloat(y.paddingTop)) * w.y;
      u *= w.x, d *= w.y, c *= w.x, f *= w.y, u += v, d += C, g = St(b), b = El(g);
    }
  }
  return Fr({
    width: c,
    height: f,
    x: u,
    y: d
  });
}
function wi(e, t) {
  const n = xi(e).scrollLeft;
  return t ? t.left + n : bs(qn(e)).left + n;
}
function qf(e, t) {
  const n = e.getBoundingClientRect(), s = n.left + t.scrollLeft - wi(e, n), o = n.top + t.scrollTop;
  return {
    x: s,
    y: o
  };
}
function pb(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: s,
    strategy: o
  } = e;
  const r = o === "fixed", i = qn(s), l = t ? bi(t.floating) : !1;
  if (s === i || l && r)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = En(1);
  const c = En(0), f = es(s);
  if ((f || !r) && ((Ss(s) !== "body" || yi(i)) && (u = xi(s)), f)) {
    const p = bs(s);
    d = Bs(s), c.x = p.x + s.clientLeft, c.y = p.y + s.clientTop;
  }
  const m = i && !f && !r ? qf(i, u) : En(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - u.scrollLeft * d.x + c.x + m.x,
    y: n.y * d.y - u.scrollTop * d.y + c.y + m.y
  };
}
function mb(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function hb(e) {
  const t = xi(e), n = e.ownerDocument.body, s = $n(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), o = $n(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let r = -t.scrollLeft + wi(e);
  const i = -t.scrollTop;
  return fn(n).direction === "rtl" && (r += $n(e.clientWidth, n.clientWidth) - s), {
    width: s,
    height: o,
    x: r,
    y: i
  };
}
const gb = 25;
function vb(e, t, n) {
  n === void 0 && (n = "viewport");
  const s = n === "layoutViewport", o = St(e), r = qn(e), i = o.visualViewport;
  let l = r.clientWidth, u = r.clientHeight, d = 0, c = 0;
  if (i) {
    const m = !ka() || t === "fixed";
    s ? m || (d = -i.offsetLeft, c = -i.offsetTop) : (l = i.width, u = i.height, m && (d = i.offsetLeft, c = i.offsetTop));
  }
  if (wi(r) <= 0) {
    const m = r.ownerDocument, p = m.body, g = getComputedStyle(p), b = m.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, w = Math.abs(r.clientWidth - p.clientWidth - b), x = getComputedStyle(r).scrollbarGutter === "stable both-edges" ? w / 2 : w;
    x <= gb && (l -= x);
  }
  return {
    width: l,
    height: u,
    x: d,
    y: c
  };
}
function yb(e, t) {
  const n = bs(e, !0, t === "fixed"), s = n.top + e.clientTop, o = n.left + e.clientLeft, r = Bs(e), i = e.clientWidth * r.x, l = e.clientHeight * r.y, u = o * r.x, d = s * r.y;
  return {
    width: i,
    height: l,
    x: u,
    y: d
  };
}
function Nu(e, t, n) {
  let s;
  if (t === "viewport" || t === "layoutViewport")
    s = vb(e, n, t);
  else if (t === "document")
    s = hb(qn(e));
  else if (cn(t))
    s = yb(t, n);
  else {
    const o = Mf(e);
    s = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Fr(s);
}
function bb(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let s = Ro(e, [], !1).filter((l) => cn(l) && Ss(l) !== "body"), o = null;
  const r = fn(e).position === "fixed";
  let i = r ? ys(e) : e;
  for (; cn(i) && !Io(i); ) {
    const l = fn(i), u = wa(i), d = o ? o.position : r ? "fixed" : "";
    !u && (d === "fixed" || d === "absolute" && l.position === "static") ? s = s.filter((f) => f !== i) : o = l, i = ys(i);
  }
  return t.set(e, s), s;
}
function xb(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: s,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? bi(t) ? [] : bb(t, this._c) : [].concat(n), s], l = Nu(t, i[0], o);
  let u = l.top, d = l.right, c = l.bottom, f = l.left;
  for (let m = 1; m < i.length; m++) {
    const p = Nu(t, i[m], o);
    u = $n(p.top, u), d = Jn(p.right, d), c = Jn(p.bottom, c), f = $n(p.left, f);
  }
  return {
    width: d - f,
    height: c - u,
    x: f,
    y: u
  };
}
function wb(e) {
  const {
    width: t,
    height: n
  } = Of(e);
  return {
    width: t,
    height: n
  };
}
function kb(e, t, n) {
  const s = es(t), o = qn(t), r = n === "fixed", i = bs(e, !0, r, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = En(0);
  if ((s || !r) && ((Ss(t) !== "body" || yi(o)) && (l = xi(t)), s)) {
    const m = bs(t, !0, r, t);
    u.x = m.x + t.clientLeft, u.y = m.y + t.clientTop;
  }
  !s && o && (u.x = wi(o));
  const d = o && !s && !r ? qf(o, l) : En(0), c = i.left + l.scrollLeft - u.x - d.x, f = i.top + l.scrollTop - u.y - d.y;
  return {
    x: c,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Ji(e) {
  return fn(e).position === "static";
}
function Vu(e, t) {
  if (!es(e) || fn(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return qn(e) === n && (n = n.ownerDocument.body), n;
}
function If(e, t) {
  const n = St(e);
  if (bi(e))
    return n;
  if (!es(e)) {
    let o = ys(e);
    for (; o && !Io(o); ) {
      if (cn(o) && !Ji(o))
        return o;
      o = ys(o);
    }
    return n;
  }
  let s = Vu(e, t);
  for (; s && lb(s) && Ji(s); )
    s = Vu(s, t);
  return s && Io(s) && Ji(s) && !wa(s) ? n : s || db(e) || n;
}
const _b = async function(e) {
  const t = this.getOffsetParent || If, n = this.getDimensions, s = await n(e.floating);
  return {
    reference: kb(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }
  };
};
function Cb(e) {
  return fn(e).direction === "rtl";
}
const Sb = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pb,
  getDocumentElement: qn,
  getClippingRect: xb,
  getOffsetParent: If,
  getElementRects: _b,
  getClientRects: mb,
  getDimensions: wb,
  getScale: Bs,
  isElement: cn,
  isRTL: Cb
};
function Rf(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function $b(e, t, n) {
  let s = null, o;
  const r = qn(e);
  function i() {
    var c;
    clearTimeout(o), (c = s) == null || c.disconnect(), s = null;
  }
  function l(c, f) {
    c === void 0 && (c = !1), f === void 0 && (f = 1), i();
    const m = e.getBoundingClientRect(), {
      left: p,
      top: g,
      width: b,
      height: w
    } = m;
    if (c || t(), !b || !w)
      return;
    const x = ar(g), y = ar(r.clientWidth - (p + b)), v = ar(r.clientHeight - (g + w)), C = ar(p), $ = {
      rootMargin: -x + "px " + -y + "px " + -v + "px " + -C + "px",
      threshold: $n(0, Jn(1, f)) || 1
    };
    let S = !0;
    function k(M) {
      const I = M[0].intersectionRatio;
      if (!Rf(m, e.getBoundingClientRect()))
        return l();
      if (I !== f) {
        if (!S)
          return l();
        I ? l(!1, I) : o = setTimeout(() => {
          l(!1, 1e-7);
        }, 1e3);
      }
      S = !1;
    }
    try {
      s = new IntersectionObserver(k, {
        ...$,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      s = new IntersectionObserver(k, $);
    }
    s.observe(e);
  }
  const u = St(e), d = () => l(n);
  return u.addEventListener("resize", d), l(!0), () => {
    u.removeEventListener("resize", d), i();
  };
}
function Eb(e, t, n, s) {
  s === void 0 && (s = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: r = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = s, d = _a(e), c = o || r ? [...d ? Ro(d) : [], ...t ? Ro(t) : []] : [];
  c.forEach((x) => {
    o && x.addEventListener("scroll", n), r && x.addEventListener("resize", n);
  });
  const f = d && l ? $b(d, n, r) : null;
  let m = -1, p = null;
  i && (p = new ResizeObserver((x) => {
    let [y] = x;
    y && y.target === d && p && t && (p.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var v;
      (v = p) == null || v.observe(t);
    })), n();
  }), d && !u && p.observe(d), t && p.observe(t));
  let g, b = u ? bs(e) : null;
  u && w();
  function w() {
    const x = bs(e);
    b && !Rf(b, x) && n(), b = x, g = requestAnimationFrame(w);
  }
  return n(), () => {
    var x;
    c.forEach((y) => {
      o && y.removeEventListener("scroll", n), r && y.removeEventListener("resize", n);
    }), f?.(), (x = p) == null || x.disconnect(), p = null, u && cancelAnimationFrame(g);
  };
}
const Tb = sb, Ab = ob, Lu = eb, Pb = ib, Ob = tb, Mb = Qy, qb = rb, Ib = (e, t, n) => {
  const s = /* @__PURE__ */ new Map(), o = n ?? {}, r = {
    ...Sb,
    ...o.platform,
    _c: s
  };
  return Zy(e, t, {
    ...o,
    platform: r
  });
};
function Rb(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function Tl(e) {
  if (Rb(e)) {
    const t = e.$el;
    return xa(t) && Ss(t) === "#comment" ? null : t;
  }
  return e;
}
function Db(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Tl(We(e.element));
      return n == null ? {} : Mb({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function Df(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function zu(e, t) {
  const n = Df(e);
  return Math.round(t * n) / n;
}
function Fb(e, t, n) {
  n === void 0 && (n = {});
  const s = n.whileElementsMounted, o = q(() => {
    var S;
    return (S = We(n.open)) != null ? S : !0;
  }), r = q(() => We(n.middleware)), i = q(() => {
    var S;
    return (S = We(n.placement)) != null ? S : "bottom";
  }), l = q(() => {
    var S;
    return (S = We(n.strategy)) != null ? S : "absolute";
  }), u = q(() => {
    var S;
    return (S = We(n.transform)) != null ? S : !0;
  }), d = q(() => Tl(e.value)), c = q(() => Tl(t.value)), f = /* @__PURE__ */ B(0), m = /* @__PURE__ */ B(0), p = /* @__PURE__ */ B(l.value), g = /* @__PURE__ */ B(i.value), b = /* @__PURE__ */ mn({}), w = /* @__PURE__ */ B(!1), x = q(() => {
    const S = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!c.value)
      return S;
    const k = zu(c.value, f.value), M = zu(c.value, m.value);
    return u.value ? {
      ...S,
      transform: "translate(" + k + "px, " + M + "px)",
      ...Df(c.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: k + "px",
      top: M + "px"
    };
  });
  let y;
  function v() {
    if (d.value == null || c.value == null)
      return;
    const S = o.value;
    Ib(d.value, c.value, {
      middleware: r.value,
      placement: i.value,
      strategy: l.value
    }).then((k) => {
      f.value = k.x, m.value = k.y, p.value = k.strategy, g.value = k.placement, b.value = k.middlewareData, w.value = S !== !1;
    });
  }
  function C() {
    typeof y == "function" && (y(), y = void 0);
  }
  function F() {
    if (C(), s === void 0) {
      v();
      return;
    }
    if (d.value != null && c.value != null) {
      y = s(d.value, c.value, v);
      return;
    }
  }
  function $() {
    o.value || (w.value = !1);
  }
  return ve([r, i, l, o], v, {
    flush: "sync"
  }), ve([d, c], F, {
    flush: "sync"
  }), ve(o, $, {
    flush: "sync"
  }), jl() && ni(C), {
    x: /* @__PURE__ */ Bn(f),
    y: /* @__PURE__ */ Bn(m),
    strategy: /* @__PURE__ */ Bn(p),
    placement: /* @__PURE__ */ Bn(g),
    middlewareData: /* @__PURE__ */ Bn(b),
    isPositioned: /* @__PURE__ */ Bn(w),
    floatingStyles: x,
    update: v
  };
}
const Bb = ["dir"], Ff = {
  side: "bottom",
  sideOffset: 0,
  sideFlip: !0,
  align: "center",
  alignOffset: 0,
  alignFlip: !0,
  arrowPadding: 0,
  hideShiftedArrow: !0,
  avoidCollisions: !0,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: !1,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: !1
}, [mT, Nb] = /* @__PURE__ */ Ye("PopperContent");
var Vb = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ qc({
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  }, { ...Ff }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, s = t, o = $f(), { forwardRef: r, currentElement: i } = fe(), l = _s(q(() => n.dir)), u = /* @__PURE__ */ B(), d = /* @__PURE__ */ B(), { width: c, height: f } = bf(d), m = q(() => n.side + (n.align !== "center" ? `-${n.align}` : "")), p = q(() => typeof n.collisionPadding == "number" ? n.collisionPadding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n.collisionPadding
    }), g = q(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), b = q(() => ({
      padding: p.value,
      boundary: g.value.filter(Ny),
      altBoundary: g.value.length > 0
    })), w = q(() => ({
      mainAxis: n.sideFlip,
      crossAxis: n.alignFlip
    })), x = q(() => [
      Tb({
        mainAxis: n.sideOffset + f.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && Lu({
        ...b.value,
        ...w.value
      }),
      n.avoidCollisions && Ab({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? qb() : void 0,
        ...b.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Lu({
        ...b.value,
        ...w.value
      }),
      Pb({
        ...b.value,
        apply: ({ elements: ie, rects: ge, availableWidth: H, availableHeight: J }) => {
          const { width: ae, height: $e } = ge.reference, Me = ie.floating.style;
          Me.setProperty("--reka-popper-available-width", `${H}px`), Me.setProperty("--reka-popper-available-height", `${J}px`), Me.setProperty("--reka-popper-anchor-width", `${ae}px`), Me.setProperty("--reka-popper-anchor-height", `${$e}px`);
        }
      }),
      d.value && Db({
        element: d.value,
        padding: n.arrowPadding
      }),
      Vy({
        arrowWidth: c.value,
        arrowHeight: f.value,
        dir: l.value
      }),
      n.hideWhenDetached && Ob({
        strategy: "referenceHidden",
        ...b.value
      })
    ]), y = q(() => n.reference ?? o.anchor.value), { floatingStyles: v, placement: C, isPositioned: F, middlewareData: $ } = Fb(y, u, {
      strategy: n.positionStrategy,
      placement: m,
      whileElementsMounted: (...ie) => Eb(...ie, {
        layoutShift: !n.disableUpdateOnLayoutShift,
        animationFrame: n.updatePositionStrategy === "always"
      }),
      middleware: x
    }), S = q(() => Sl(C.value)[0]), k = q(() => Sl(C.value)[1]);
    $c(() => {
      F.value && s("placed");
    });
    const M = q(() => {
      const ie = $.value.arrow?.centerOffset !== 0;
      return n.hideShiftedArrow && ie;
    }), I = /* @__PURE__ */ B("");
    kt(() => {
      i.value && (I.value = window.getComputedStyle(i.value).zIndex);
    });
    const L = q(() => $.value.arrow?.x ?? 0), se = q(() => $.value.arrow?.y ?? 0);
    return Nb({
      placedSide: S,
      onArrowChange: (ie) => d.value = ie,
      arrowX: L,
      arrowY: se,
      shouldHideArrow: M
    }), (ie, ge) => (h(), A("div", {
      ref_key: "floatingRef",
      ref: u,
      "data-reka-popper-content-wrapper": "",
      dir: a(l),
      style: Ie({
        ...a(v),
        transform: a(F) ? a(v).transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: I.value,
        "--reka-popper-transform-origin": [a($).transformOrigin?.x, a($).transformOrigin?.y].join(" "),
        ...a($).hide?.referenceHidden && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      })
    }, [n.memoDependencies ? Wh([
      n.asChild,
      n.as,
      S.value,
      k.value,
      a(F),
      ...Object.values(ie.$attrs),
      ...n.memoDependencies
    ], () => (h(), D(a(xe), ue({
      key: 0,
      ref: a(r)
    }, ie.$attrs, {
      "as-child": n.asChild,
      as: n.as,
      "data-side": S.value,
      "data-align": k.value,
      style: { animation: a(F) ? void 0 : "none" }
    }), {
      default: E(() => [G(ie.$slots, "default")]),
      _: 3
    }, 16, [
      "as-child",
      "as",
      "data-side",
      "data-align",
      "style"
    ])), ge, 0) : (h(), D(a(xe), ue({
      key: 1,
      ref: a(r)
    }, ie.$attrs, {
      "as-child": n.asChild,
      as: n.as,
      "data-side": S.value,
      "data-align": k.value,
      dir: a(l),
      style: { animation: a(F) ? void 0 : "none" }
    }), {
      default: E(() => [G(ie.$slots, "default")]),
      _: 3
    }, 16, [
      "as-child",
      "as",
      "data-side",
      "data-align",
      "dir",
      "style"
    ]))], 12, Bb));
  }
}), Ca = Vb;
function Lb(e) {
  const t = Ws({ nonce: /* @__PURE__ */ B() });
  return q(() => e?.value || t.nonce?.value);
}
const [zb, jb] = /* @__PURE__ */ Ye("RovingFocusGroup");
var Kb = /* @__PURE__ */ V({
  __name: "RovingFocusGroup",
  props: {
    orientation: {
      type: String,
      required: !1,
      default: void 0
    },
    dir: {
      type: String,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    currentTabStopId: {
      type: [String, null],
      required: !1
    },
    defaultCurrentTabStopId: {
      type: String,
      required: !1
    },
    preventScrollOnEntryFocus: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(e, { expose: t, emit: n }) {
    const s = e, o = n, { loop: r, orientation: i, dir: l } = /* @__PURE__ */ it(s), u = _s(l), d = /* @__PURE__ */ Rt(s, "currentTabStopId", o, {
      defaultValue: s.defaultCurrentTabStopId,
      passive: s.currentTabStopId === void 0
    }), c = /* @__PURE__ */ B(!1), f = /* @__PURE__ */ B(!1), m = /* @__PURE__ */ B(0), { getItems: p, CollectionSlot: g } = Et({ isProvider: !0 });
    function b(x) {
      const y = !f.value;
      if (x.currentTarget && x.target === x.currentTarget && y && !c.value) {
        const v = new CustomEvent(Py, Oy);
        if (x.currentTarget.dispatchEvent(v), o("entryFocus", v), !v.defaultPrevented) {
          const C = p().map((M) => M.ref).filter((M) => M.dataset.disabled !== ""), F = C.find((M) => M.getAttribute("data-active") === ""), $ = C.find((M) => M.getAttribute("data-highlighted") === ""), S = C.find((M) => M.id === d.value), k = [
            F,
            $,
            S,
            ...C
          ].filter(Boolean);
          Sf(k, s.preventScrollOnEntryFocus);
        }
      }
      f.value = !1;
    }
    function w() {
      setTimeout(() => {
        f.value = !1;
      }, 1);
    }
    return t({ getItems: p }), jb({
      loop: r,
      dir: u,
      orientation: i,
      currentTabStopId: d,
      onItemFocus: (x) => {
        d.value = x;
      },
      onItemShiftTab: () => {
        c.value = !0;
      },
      onFocusableItemAdd: () => {
        m.value++;
      },
      onFocusableItemRemove: () => {
        m.value--;
      }
    }), (x, y) => (h(), D(a(g), null, {
      default: E(() => [O(a(xe), {
        tabindex: c.value || m.value === 0 ? -1 : 0,
        "data-orientation": a(i),
        as: e.as,
        "as-child": e.asChild,
        dir: a(u),
        style: { outline: "none" },
        onMousedown: y[0] || (y[0] = (v) => f.value = !0),
        onMouseup: w,
        onFocus: b,
        onBlur: y[1] || (y[1] = (v) => c.value = !1)
      }, {
        default: E(() => [G(x.$slots, "default")]),
        _: 3
      }, 8, [
        "tabindex",
        "data-orientation",
        "as",
        "as-child",
        "dir"
      ])]),
      _: 3
    }));
  }
}), Bf = Kb, Hb = /* @__PURE__ */ V({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {
      type: String,
      required: !1
    },
    focusable: {
      type: Boolean,
      required: !1,
      default: !0
    },
    active: {
      type: Boolean,
      required: !1
    },
    allowShiftKey: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = e, n = zb(), s = Xn(), o = q(() => t.tabStopId || s), r = q(() => n.currentTabStopId.value === o.value), { getItems: i, CollectionItem: l } = Et();
    Ke(() => {
      t.focusable && n.onFocusableItemAdd();
    }), hn(() => {
      t.focusable && n.onFocusableItemRemove();
    }), ve(() => t.focusable, (p, g) => {
      p !== g && (p ? n.onFocusableItemAdd() : n.onFocusableItemRemove());
    });
    function u(p) {
      if (p.defaultPrevented) return;
      if (p.key === "Tab" && p.shiftKey) {
        n.onItemShiftTab();
        return;
      }
      if (p.target !== p.currentTarget) return;
      const g = Iy(p, n.orientation.value, n.dir.value);
      if (g !== void 0) {
        if (p.metaKey || p.ctrlKey || p.altKey || !t.allowShiftKey && p.shiftKey) return;
        p.preventDefault();
        let b = [...i().map((w) => w.ref).filter((w) => w.dataset.disabled !== "")];
        if (g === "last") b.reverse();
        else if (g === "prev" || g === "next") {
          g === "prev" && b.reverse();
          const w = b.indexOf(p.currentTarget);
          b = n.loop.value ? Ry(b, w + 1) : b.slice(w + 1);
        }
        Ue(() => Sf(b));
      }
    }
    const { forwardRef: d, currentElement: c } = fe(), f = /* @__PURE__ */ mn();
    ve(c, (p) => {
      f.value = p;
    }, {
      immediate: !0,
      flush: "post"
    }), Ft(f, "keydown", u);
    function m(p) {
      f.value = p.currentTarget;
    }
    return (p, g) => (h(), D(a(l), null, {
      default: E(() => [O(a(xe), {
        ref: a(d),
        tabindex: r.value ? 0 : -1,
        "data-orientation": a(n).orientation.value,
        "data-active": e.active ? "" : void 0,
        "data-disabled": e.focusable ? void 0 : "",
        as: e.as,
        "as-child": e.asChild,
        onMousedown: g[0] || (g[0] = (b) => {
          e.focusable ? a(n).onItemFocus(o.value) : b.preventDefault();
        }),
        onFocus: g[1] || (g[1] = (b) => a(n).onItemFocus(o.value)),
        onFocusin: m
      }, {
        default: E(() => [G(p.$slots, "default")]),
        _: 3
      }, 8, [
        "tabindex",
        "data-orientation",
        "data-active",
        "data-disabled",
        "as",
        "as-child"
      ])]),
      _: 3
    }));
  }
}), Ub = Hb;
const [Nf] = /* @__PURE__ */ Ye("FieldRoot");
function Wb(e = [], t, n) {
  const s = [...e];
  return s[n] = t, s.sort((o, r) => o - r);
}
function Vf(e, t, n) {
  const r = 100 / (n - t) * (e - t);
  return Ls(r, 0, 100);
}
function Gb(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function Yb(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), s = Math.min(...n);
  return n.indexOf(s);
}
function Xb(e, t, n) {
  const s = e / 2, r = Sa([0, 50], [0, s]);
  return (s - r(t) * n) * n;
}
function Jb(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function Zb(e, t) {
  if (t > 0) {
    const n = Jb(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function Sa(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const s = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + s * (n - e[0]);
  };
}
function Qb(e) {
  return (String(e).split(".")[1] || "").length;
}
function ex(e, t) {
  const n = 10 ** t;
  return Math.round(e * n) / n;
}
const Lf = ["PageUp", "PageDown"], zf = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
], jf = {
  "from-left": [
    "Home",
    "PageDown",
    "ArrowDown",
    "ArrowLeft"
  ],
  "from-right": [
    "Home",
    "PageDown",
    "ArrowDown",
    "ArrowRight"
  ],
  "from-bottom": [
    "Home",
    "PageDown",
    "ArrowDown",
    "ArrowLeft"
  ],
  "from-top": [
    "Home",
    "PageUp",
    "ArrowUp",
    "ArrowLeft"
  ]
}, [Kf, Hf] = /* @__PURE__ */ Ye(["SliderVertical", "SliderHorizontal"]);
var tx = /* @__PURE__ */ V({
  __name: "SliderHorizontal",
  props: {
    dir: {
      type: String,
      required: !1
    },
    min: {
      type: Number,
      required: !0
    },
    max: {
      type: Number,
      required: !0
    },
    inverted: {
      type: Boolean,
      required: !0
    }
  },
  emits: [
    "slideEnd",
    "slideStart",
    "slideMove",
    "homeKeyDown",
    "endKeyDown",
    "stepKeyDown"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, { max: o, min: r, dir: i, inverted: l } = /* @__PURE__ */ it(n), { forwardRef: u, currentElement: d } = fe(), c = Zs(), f = /* @__PURE__ */ B(), m = /* @__PURE__ */ B(), p = q(() => i?.value !== "rtl" && !l.value || i?.value !== "ltr" && l.value);
    function g(y, v) {
      const C = m.value || d.value.getBoundingClientRect(), F = [...c.thumbElements.value][c.valueIndexToChangeRef.value], $ = c.thumbAlignment.value === "contain" ? F.clientWidth : 0;
      !f.value && !v && c.thumbAlignment.value === "contain" && (f.value = y.clientX - F.getBoundingClientRect().left);
      const S = [0, C.width - $], k = p.value ? [r.value, o.value] : [o.value, r.value], M = Sa(S, k);
      m.value = C;
      const I = v ? y.clientX - C.left - $ / 2 : y.clientX - C.left - (f.value ?? 0);
      return M(I);
    }
    const b = q(() => p.value ? "left" : "right"), w = q(() => p.value ? "right" : "left"), x = q(() => p.value ? 1 : -1);
    return Hf({
      startEdge: b,
      endEdge: w,
      direction: x,
      size: "width"
    }), (y, v) => (h(), D(Wf, {
      ref: a(u),
      dir: a(i),
      "data-orientation": "horizontal",
      style: Ie({ "--reka-slider-thumb-transform": !p.value && a(c).thumbAlignment.value === "overflow" ? "translateX(50%)" : "translateX(-50%)" }),
      onSlideStart: v[0] || (v[0] = (C) => {
        const F = g(C, !0);
        s("slideStart", F);
      }),
      onSlideMove: v[1] || (v[1] = (C) => {
        const F = g(C);
        s("slideMove", F);
      }),
      onSlideEnd: v[2] || (v[2] = () => {
        m.value = void 0, f.value = void 0, s("slideEnd");
      }),
      onStepKeyDown: v[3] || (v[3] = (C) => {
        const F = p.value ? "from-left" : "from-right", $ = a(jf)[F].includes(C.key);
        s("stepKeyDown", C, $ ? -1 : 1);
      }),
      onEndKeyDown: v[4] || (v[4] = (C) => s("endKeyDown", C)),
      onHomeKeyDown: v[5] || (v[5] = (C) => s("homeKeyDown", C))
    }, {
      default: E(() => [G(y.$slots, "default")]),
      _: 3
    }, 8, ["dir", "style"]));
  }
}), nx = tx, sx = /* @__PURE__ */ V({
  __name: "SliderVertical",
  props: {
    min: {
      type: Number,
      required: !0
    },
    max: {
      type: Number,
      required: !0
    },
    inverted: {
      type: Boolean,
      required: !0
    }
  },
  emits: [
    "slideEnd",
    "slideStart",
    "slideMove",
    "homeKeyDown",
    "endKeyDown",
    "stepKeyDown"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, { max: o, min: r, inverted: i } = /* @__PURE__ */ it(n), l = Zs(), { forwardRef: u, currentElement: d } = fe(), c = /* @__PURE__ */ B(), f = /* @__PURE__ */ B(), m = q(() => !i.value);
    function p(x, y) {
      const v = f.value || d.value.getBoundingClientRect(), C = [...l.thumbElements.value][l.valueIndexToChangeRef.value], F = l.thumbAlignment.value === "contain" ? C.clientHeight : 0;
      !c.value && !y && l.thumbAlignment.value === "contain" && (c.value = x.clientY - C.getBoundingClientRect().top);
      const $ = [0, v.height - F], S = m.value ? [o.value, r.value] : [r.value, o.value], k = Sa($, S), M = y ? x.clientY - v.top - F / 2 : x.clientY - v.top - (c.value ?? 0);
      return f.value = v, k(M);
    }
    const g = q(() => m.value ? "bottom" : "top"), b = q(() => m.value ? "top" : "bottom"), w = q(() => m.value ? 1 : -1);
    return Hf({
      startEdge: g,
      endEdge: b,
      direction: w,
      size: "height"
    }), (x, y) => (h(), D(Wf, {
      ref: a(u),
      "data-orientation": "vertical",
      style: Ie({ "--reka-slider-thumb-transform": !m.value && a(l).thumbAlignment.value === "overflow" ? "translateY(-50%)" : "translateY(50%)" }),
      onSlideStart: y[0] || (y[0] = (v) => {
        const C = p(v, !0);
        s("slideStart", C);
      }),
      onSlideMove: y[1] || (y[1] = (v) => {
        const C = p(v);
        s("slideMove", C);
      }),
      onSlideEnd: y[2] || (y[2] = () => {
        f.value = void 0, c.value = void 0, s("slideEnd");
      }),
      onStepKeyDown: y[3] || (y[3] = (v) => {
        const C = m.value ? "from-bottom" : "from-top", F = a(jf)[C].includes(v.key);
        s("stepKeyDown", v, F ? -1 : 1);
      }),
      onEndKeyDown: y[4] || (y[4] = (v) => s("endKeyDown", v)),
      onHomeKeyDown: y[5] || (y[5] = (v) => s("homeKeyDown", v))
    }, {
      default: E(() => [G(x.$slots, "default")]),
      _: 3
    }, 8, ["style"]));
  }
}), ox = sx;
const [Zs, rx] = /* @__PURE__ */ Ye("SliderRoot");
var ix = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SliderRoot",
  props: {
    defaultValue: {
      type: Array,
      required: !1,
      default: () => [0]
    },
    modelValue: {
      type: [Array, null],
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: !1
    },
    orientation: {
      type: String,
      required: !1,
      default: "horizontal"
    },
    dir: {
      type: String,
      required: !1
    },
    inverted: {
      type: Boolean,
      required: !1,
      default: !1
    },
    min: {
      type: Number,
      required: !1,
      default: 0
    },
    max: {
      type: Number,
      required: !1,
      default: 100
    },
    step: {
      type: Number,
      required: !1,
      default: 1
    },
    minStepsBetweenThumbs: {
      type: Number,
      required: !1,
      default: 0
    },
    thumbAlignment: {
      type: String,
      required: !1,
      default: "contain"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue", "valueCommit"],
  setup(e, { emit: t }) {
    const n = e, s = t, { min: o, max: r, step: i, minStepsBetweenThumbs: l, orientation: u, disabled: d, thumbAlignment: c, dir: f } = /* @__PURE__ */ it(n), m = _s(f), { forwardRef: p, currentElement: g } = fe(), b = Gs(g), { CollectionSlot: w } = Et({ isProvider: !0 }), x = /* @__PURE__ */ Rt(n, "modelValue", s, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), y = q(() => Array.isArray(x.value) ? [...x.value] : []), v = /* @__PURE__ */ B(0), C = /* @__PURE__ */ B(y.value);
    function F(I) {
      const L = Yb(y.value, I);
      k(I, L);
    }
    function $(I) {
      k(I, v.value);
    }
    function S() {
      const I = C.value[v.value];
      y.value[v.value] !== I && s("valueCommit", /* @__PURE__ */ Re(y.value));
    }
    function k(I, L, { commit: se } = { commit: !1 }) {
      const ie = Qb(i.value), ge = ex(Math.round((I - o.value) / i.value) * i.value + o.value, ie), H = Ls(ge, o.value, r.value), J = Wb(y.value, H, L);
      if (Zb(J, l.value * i.value)) {
        v.value = J.indexOf(H);
        const ae = String(J) !== String(x.value);
        ae && se && s("valueCommit", J), ae && (M.value[v.value]?.focus(), x.value = J);
      }
    }
    const M = /* @__PURE__ */ B([]);
    return rx({
      modelValue: x,
      currentModelValue: y,
      valueIndexToChangeRef: v,
      thumbElements: M,
      orientation: u,
      min: o,
      max: r,
      disabled: d,
      thumbAlignment: c
    }), (I, L) => (h(), D(a(w), null, {
      default: E(() => [(h(), D(ws(a(u) === "horizontal" ? nx : ox), ue(I.$attrs, {
        ref: a(p),
        "as-child": e.asChild,
        as: e.as,
        min: a(o),
        max: a(r),
        dir: a(m),
        inverted: e.inverted,
        "aria-disabled": a(d),
        "data-disabled": a(d) ? "" : void 0,
        onPointerdown: L[0] || (L[0] = () => {
          a(d) || (C.value = y.value);
        }),
        onSlideStart: L[1] || (L[1] = (se) => !a(d) && F(se)),
        onSlideMove: L[2] || (L[2] = (se) => !a(d) && $(se)),
        onSlideEnd: L[3] || (L[3] = (se) => !a(d) && S()),
        onHomeKeyDown: L[4] || (L[4] = (se) => !a(d) && k(a(o), 0, { commit: !0 })),
        onEndKeyDown: L[5] || (L[5] = (se) => !a(d) && k(a(r), y.value.length - 1, { commit: !0 })),
        onStepKeyDown: L[6] || (L[6] = (se, ie) => {
          if (!a(d)) {
            const J = a(Lf).includes(se.key) || se.shiftKey && a(zf).includes(se.key) ? 10 : 1, ae = v.value, $e = y.value[ae], Me = a(i) * J * ie;
            k($e + Me, ae, { commit: !0 });
          }
        })
      }), {
        default: E(() => [G(I.$slots, "default", { modelValue: a(x) }), a(b) && e.name ? (h(), D(a(Uo), {
          key: 0,
          type: "number",
          value: a(x),
          name: e.name,
          required: e.required,
          disabled: a(d),
          step: a(i)
        }, null, 8, [
          "value",
          "name",
          "required",
          "disabled",
          "step"
        ])) : Y("v-if", !0)]),
        _: 3
      }, 16, [
        "as-child",
        "as",
        "min",
        "max",
        "dir",
        "inverted",
        "aria-disabled",
        "data-disabled"
      ]))]),
      _: 3
    }));
  }
}), Uf = ix, lx = /* @__PURE__ */ V({
  __name: "SliderImpl",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  emits: [
    "slideStart",
    "slideMove",
    "slideEnd",
    "homeKeyDown",
    "endKeyDown",
    "stepKeyDown"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Zs();
    return (r, i) => (h(), D(a(xe), ue({ "data-slider-impl": "" }, n, {
      onKeydown: i[0] || (i[0] = (l) => {
        l.key === "Home" ? (s("homeKeyDown", l), l.preventDefault()) : l.key === "End" ? (s("endKeyDown", l), l.preventDefault()) : a(Lf).concat(a(zf)).includes(l.key) && (s("stepKeyDown", l), l.preventDefault());
      }),
      onPointerdown: i[1] || (i[1] = (l) => {
        const u = l.target;
        u.setPointerCapture(l.pointerId), l.preventDefault(), a(o).thumbElements.value.includes(u) ? u.focus() : s("slideStart", l);
      }),
      onPointermove: i[2] || (i[2] = (l) => {
        l.target.hasPointerCapture(l.pointerId) && s("slideMove", l);
      }),
      onPointerup: i[3] || (i[3] = (l) => {
        const u = l.target;
        u.hasPointerCapture(l.pointerId) && (u.releasePointerCapture(l.pointerId), s("slideEnd", l));
      })
    }), {
      default: E(() => [G(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Wf = lx, ax = /* @__PURE__ */ V({
  __name: "SliderRange",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = Zs(), n = Kf();
    fe();
    const s = q(() => t.currentModelValue.value.map((i) => Vf(i, t.min.value, t.max.value))), o = q(() => t.currentModelValue.value.length > 1 ? Math.min(...s.value) : 0), r = q(() => 100 - Math.max(...s.value, 0));
    return (i, l) => (h(), D(a(xe), {
      "data-disabled": a(t).disabled.value ? "" : void 0,
      "data-orientation": a(t).orientation.value,
      "as-child": e.asChild,
      as: e.as,
      style: Ie({
        [a(n).startEdge.value]: `${o.value}%`,
        [a(n).endEdge.value]: `${r.value}%`
      })
    }, {
      default: E(() => [G(i.$slots, "default")]),
      _: 3
    }, 8, [
      "data-disabled",
      "data-orientation",
      "as-child",
      "as",
      "style"
    ]));
  }
}), ux = ax, dx = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SliderThumbImpl",
  props: {
    index: {
      type: Number,
      required: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = Zs(), s = Kf(), { forwardRef: o, currentElement: r } = fe(), { CollectionItem: i } = Et(), l = q(() => n.modelValue?.value?.[t.index]), u = q(() => l.value === void 0 ? 0 : Vf(l.value, n.min.value ?? 0, n.max.value ?? 100)), d = q(() => Gb(t.index, n.modelValue?.value?.length ?? 0)), c = bf(r), f = q(() => c[s.size].value), m = q(() => n.thumbAlignment.value === "overflow" || !f.value ? 0 : Xb(f.value, u.value, s.direction.value)), p = /* @__PURE__ */ ia();
    return Ke(() => {
      n.thumbElements.value.push(r.value);
    }), hn(() => {
      const g = n.thumbElements.value.findIndex((b) => b === r.value) ?? -1;
      n.thumbElements.value.splice(g, 1);
    }), (g, b) => (h(), D(a(i), null, {
      default: E(() => [O(a(xe), ue(g.$attrs, {
        ref: a(o),
        role: "slider",
        tabindex: a(n).disabled.value ? void 0 : 0,
        "aria-label": g.$attrs["aria-label"] || d.value,
        "data-disabled": a(n).disabled.value ? "" : void 0,
        "data-orientation": a(n).orientation.value,
        "aria-valuenow": l.value,
        "aria-valuemin": a(n).min.value,
        "aria-valuemax": a(n).max.value,
        "aria-orientation": a(n).orientation.value,
        "as-child": e.asChild,
        as: e.as,
        style: {
          transform: "var(--reka-slider-thumb-transform)",
          position: "absolute",
          [a(s).startEdge.value]: `calc(${u.value}% + ${m.value}px)`,
          display: !a(p) && l.value === void 0 ? "none" : void 0
        },
        onFocus: b[0] || (b[0] = () => {
          a(n).valueIndexToChangeRef.value = e.index;
        })
      }), {
        default: E(() => [G(g.$slots, "default")]),
        _: 3
      }, 16, [
        "tabindex",
        "aria-label",
        "data-disabled",
        "data-orientation",
        "aria-valuenow",
        "aria-valuemin",
        "aria-valuemax",
        "aria-orientation",
        "as-child",
        "as",
        "style"
      ])]),
      _: 3
    }));
  }
}), cx = dx, fx = /* @__PURE__ */ V({
  __name: "SliderThumb",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = e, { getItems: n } = Et(), { forwardRef: s, currentElement: o } = fe(), r = q(() => o.value ? n(!0).findIndex((i) => i.ref === o.value) : -1);
    return (i, l) => (h(), D(cx, ue({ ref: a(s) }, t, { index: r.value }), {
      default: E(() => [G(i.$slots, "default")]),
      _: 3
    }, 16, ["index"]));
  }
}), Gf = fx, px = /* @__PURE__ */ V({
  __name: "SliderTrack",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = Zs();
    return fe(), (n, s) => (h(), D(a(xe), {
      "as-child": e.asChild,
      as: e.as,
      "data-disabled": a(t).disabled.value ? "" : void 0,
      "data-orientation": a(t).orientation.value
    }, {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "data-disabled",
      "data-orientation"
    ]));
  }
}), Yf = px, mx = /* @__PURE__ */ V({
  __name: "MenuAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, s) => (h(), D(a(ga), Nt(gn(t)), {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), hx = mx;
function gx() {
  const e = /* @__PURE__ */ B(!1);
  return Ke(() => {
    Ft("keydown", () => {
      e.value = !0;
    }, {
      capture: !0,
      passive: !0
    }), Ft(["pointerdown", "pointermove"], () => {
      e.value = !1;
    }, {
      capture: !0,
      passive: !0
    });
  }), e;
}
const vx = /* @__PURE__ */ uf(gx), [ki, yx] = /* @__PURE__ */ Ye(["MenuRoot", "MenuSub"], "MenuContext"), [$a, bx] = /* @__PURE__ */ Ye("MenuRoot");
var xx = /* @__PURE__ */ V({
  __name: "MenuRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: !1
    },
    dir: {
      type: String,
      required: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, s = t, { modal: o, dir: r } = /* @__PURE__ */ it(n), i = _s(r), l = /* @__PURE__ */ Rt(n, "open", s), u = /* @__PURE__ */ B(), d = vx();
    return yx({
      open: l,
      onOpenChange: (c) => {
        l.value = c;
      },
      content: u,
      onContentChange: (c) => {
        u.value = c;
      }
    }), bx({
      onClose: () => {
        l.value = !1;
      },
      isUsingKeyboardRef: d,
      dir: i,
      modal: o
    }), (c, f) => (h(), D(a(ha), null, {
      default: E(() => [G(c.$slots, "default")]),
      _: 3
    }));
  }
}), wx = xx;
const [Xf, kx] = /* @__PURE__ */ Ye("MenuContent");
var _x = /* @__PURE__ */ V({
  __name: "MenuContentImpl",
  props: /* @__PURE__ */ qc({
    loop: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    disableOutsideScroll: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  }, { ...Ff }),
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus",
    "dismiss"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = ki(), r = $a(), { trapFocus: i, disableOutsidePointerEvents: l, loop: u } = /* @__PURE__ */ it(n);
    vf(), ua(l.value);
    const d = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B(0), f = /* @__PURE__ */ B(0), m = /* @__PURE__ */ B(null), p = /* @__PURE__ */ B("right"), g = /* @__PURE__ */ B(0), b = /* @__PURE__ */ B(null), w = /* @__PURE__ */ B(), { forwardRef: x, currentElement: y } = fe(), { handleTypeaheadSearch: v } = fa(), C = /* @__PURE__ */ B();
    function F(H) {
      const J = Su(H, C.value || Ge(), y.value, {
        loop: u.value,
        arrowKeyOptions: "vertical",
        dir: r?.dir.value,
        focus: !1,
        attributeName: "[data-reka-collection-item]:not([data-disabled])"
      });
      J && (C.value = J, J.scrollIntoView({ block: "nearest" }));
    }
    function $() {
      C.value && C.value.click();
    }
    const S = /* @__PURE__ */ B(), k = /* @__PURE__ */ B();
    ve(C, (H) => {
      if (k.value && (H === void 0 || H !== k.value.trigger.value)) {
        if (H === void 0) return;
        k.value.onOpenChange(!1), k.value = void 0;
      }
    }), ve(y, (H) => {
      o.onContentChange(H);
    }), hn(() => {
      window.clearTimeout(c.value);
    });
    function M(H) {
      return p.value === m.value?.side && ay(H, m.value?.area);
    }
    async function I(H) {
      s("openAutoFocus", H), !H.defaultPrevented && (H.preventDefault(), y.value?.focus({ preventScroll: !0 }));
    }
    function L(H) {
      if (H.defaultPrevented) return;
      const J = H.target, ae = J.closest("[data-reka-menu-content]") === H.currentTarget, $e = ["input", "textarea"].includes(J.tagName.toLowerCase()), Me = H.ctrlKey || H.altKey || H.metaKey, ne = H.key.length === 1, tt = Su(H, Ge(), y.value, {
        loop: u.value,
        arrowKeyOptions: "vertical",
        dir: r?.dir.value,
        focus: !0,
        attributeName: "[data-reka-collection-item]:not([data-disabled])"
      });
      if (tt) return tt?.focus();
      if (H.code === "Space") return;
      const He = w.value?.getItems() ?? [];
      if (ae && (H.key === "Tab" && r.modal.value && H.preventDefault(), !Me && ne && !$e && v(H.key, He)), H.target !== y.value || !ry.includes(H.key)) return;
      H.preventDefault();
      const we = [...He.map((Pe) => Pe.ref)];
      kf.includes(H.key) && we.reverse(), Cl(we);
    }
    function se(H) {
      H?.currentTarget?.contains?.(H.target) || (window.clearTimeout(c.value), d.value = "");
    }
    function ie(H) {
      if (!Ir(H)) return;
      const J = H.target, ae = g.value !== H.clientX;
      if (H?.currentTarget?.contains(J) && ae) {
        const $e = H.clientX > g.value ? "right" : "left";
        p.value = $e, g.value = H.clientX;
      }
    }
    function ge(H) {
      Ir(H) && S.value && S.value.focus();
    }
    return kx({
      onItemEnter: (H) => !!M(H),
      onItemLeave: (H) => M(H) ? !0 : (["INPUT", "TEXTAREA"].includes(Ge()?.tagName || "") || y.value?.focus(), b.value = null, !1),
      onTriggerLeave: (H) => !!M(H),
      searchRef: d,
      highlightedElement: C,
      onKeydownNavigation: F,
      onKeydownEnter: $,
      filterElement: S,
      onFilterElementChange: (H) => {
        S.value = H;
      },
      activeSubmenuContext: k,
      pointerGraceTimerRef: f,
      onPointerGraceIntentChange: (H) => {
        m.value = H;
      }
    }), (H, J) => (h(), D(a(ma), {
      "as-child": "",
      trapped: a(i),
      onMountAutoFocus: I,
      onUnmountAutoFocus: J[7] || (J[7] = (ae) => s("closeAutoFocus", ae))
    }, {
      default: E(() => [O(a(hi), {
        "as-child": "",
        "disable-outside-pointer-events": a(l),
        onEscapeKeyDown: J[2] || (J[2] = (ae) => s("escapeKeyDown", ae)),
        onPointerDownOutside: J[3] || (J[3] = (ae) => s("pointerDownOutside", ae)),
        onFocusOutside: J[4] || (J[4] = (ae) => s("focusOutside", ae)),
        onInteractOutside: J[5] || (J[5] = (ae) => s("interactOutside", ae)),
        onDismiss: J[6] || (J[6] = (ae) => s("dismiss"))
      }, {
        default: E(() => [O(a(Bf), {
          ref_key: "rovingFocusGroupRef",
          ref: w,
          "current-tab-stop-id": b.value,
          "onUpdate:currentTabStopId": J[0] || (J[0] = (ae) => b.value = ae),
          "as-child": "",
          orientation: "vertical",
          dir: a(r).dir.value,
          loop: a(u),
          onEntryFocus: J[1] || (J[1] = (ae) => {
            s("entryFocus", ae), a(r).isUsingKeyboardRef.value || ae.preventDefault();
          })
        }, {
          default: E(() => [O(a(Ca), {
            ref: a(x),
            role: "menu",
            as: e.as,
            "as-child": e.asChild,
            "aria-orientation": "vertical",
            "data-reka-menu-content": "",
            "data-state": a(_f)(a(o).open.value),
            dir: a(r).dir.value,
            side: e.side,
            "side-offset": e.sideOffset,
            align: e.align,
            "align-offset": e.alignOffset,
            "avoid-collisions": e.avoidCollisions,
            "collision-boundary": e.collisionBoundary,
            "collision-padding": e.collisionPadding,
            "arrow-padding": e.arrowPadding,
            "prioritize-position": e.prioritizePosition,
            "position-strategy": e.positionStrategy,
            "update-position-strategy": e.updatePositionStrategy,
            sticky: e.sticky,
            "hide-when-detached": e.hideWhenDetached,
            reference: e.reference,
            onKeydown: L,
            onBlur: se,
            onPointermove: ie,
            onPointerenter: ge
          }, {
            default: E(() => [G(H.$slots, "default")]),
            _: 3
          }, 8, [
            "as",
            "as-child",
            "data-state",
            "dir",
            "side",
            "side-offset",
            "align",
            "align-offset",
            "avoid-collisions",
            "collision-boundary",
            "collision-padding",
            "arrow-padding",
            "prioritize-position",
            "position-strategy",
            "update-position-strategy",
            "sticky",
            "hide-when-detached",
            "reference"
          ])]),
          _: 3
        }, 8, [
          "current-tab-stop-id",
          "dir",
          "loop"
        ])]),
        _: 3
      }, 8, ["disable-outside-pointer-events"])]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Jf = _x, Cx = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "MenuItemImpl",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = Xf(), { forwardRef: s, currentElement: o } = fe(), { CollectionItem: r } = Et(), i = /* @__PURE__ */ B(!1), l = q(() => i.value || o.value != null && n.highlightedElement.value === o.value);
    async function u(c) {
      if (!(c.defaultPrevented || !Ir(c))) {
        if (t.disabled) n.onItemLeave(c);
        else if (!n.onItemEnter(c)) {
          const m = c.currentTarget;
          n.highlightedElement.value = m, ["INPUT", "TEXTAREA"].includes(Ge()?.tagName || "") || m.focus({ preventScroll: !0 });
        }
      }
    }
    async function d(c) {
      if (await Ue(), c.defaultPrevented || !Ir(c) || n.highlightedElement.value !== o.value) return;
      !n.onItemLeave(c) && n.highlightedElement.value === o.value && (n.highlightedElement.value = void 0);
    }
    return (c, f) => (h(), D(a(r), { value: { textValue: e.textValue } }, {
      default: E(() => [O(a(xe), ue({
        ref: a(s),
        role: "menuitem",
        tabindex: "-1"
      }, c.$attrs, {
        as: e.as,
        "as-child": e.asChild,
        "aria-disabled": e.disabled || void 0,
        "data-disabled": e.disabled ? "" : void 0,
        "data-highlighted": l.value ? "" : void 0,
        onPointermove: u,
        onPointerleave: d,
        onFocus: f[0] || (f[0] = async (m) => {
          const p = m.currentTarget;
          await Ue(), !(m.defaultPrevented || e.disabled) && (i.value = !0, a(n).highlightedElement.value = p);
        }),
        onBlur: f[1] || (f[1] = async (m) => {
          await Ue(), !m.defaultPrevented && (i.value = !1);
        })
      }), {
        default: E(() => [G(c.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "aria-disabled",
        "data-disabled",
        "data-highlighted"
      ])]),
      _: 3
    }, 8, ["value"]));
  }
}), Sx = Cx, $x = /* @__PURE__ */ V({
  __name: "MenuItem",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, s = t, { forwardRef: o, currentElement: r } = fe(), i = $a(), l = Xf(), u = /* @__PURE__ */ B(!1);
    async function d() {
      const c = r.value;
      if (!n.disabled && c) {
        const f = new CustomEvent(sy, {
          bubbles: !0,
          cancelable: !0
        });
        s("select", f), await Ue(), f.defaultPrevented ? u.value = !1 : i.onClose();
      }
    }
    return (c, f) => (h(), D(Sx, ue(n, {
      ref: a(o),
      onClick: d,
      onPointerdown: f[0] || (f[0] = () => {
        u.value = !0;
      }),
      onPointerup: f[1] || (f[1] = async (m) => {
        await Ue(), !m.defaultPrevented && (u.value || m.currentTarget?.click());
      }),
      onKeydown: f[2] || (f[2] = async (m) => {
        const p = a(l).searchRef.value !== "";
        e.disabled || p && m.key === " " || a(_l).includes(m.key) && (m.currentTarget?.click(), m.preventDefault());
      })
    }), {
      default: E(() => [G(c.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Ex = $x, Tx = /* @__PURE__ */ V({
  __name: "MenuRootContentModal",
  props: {
    loop: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Xs(n, s), r = ki(), { forwardRef: i, currentElement: l } = fe();
    return ca(l), (u, d) => (h(), D(Jf, ue(a(o), {
      ref: a(i),
      "trap-focus": a(r).open.value,
      "disable-outside-pointer-events": a(r).open.value,
      "disable-outside-scroll": !0,
      onDismiss: d[0] || (d[0] = (c) => a(r).onOpenChange(!1)),
      onFocusOutside: d[1] || (d[1] = Gt((c) => s("focusOutside", c), ["prevent"]))
    }), {
      default: E(() => [G(u.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus", "disable-outside-pointer-events"]));
  }
}), Ax = Tx, Px = /* @__PURE__ */ V({
  __name: "MenuRootContentNonModal",
  props: {
    loop: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const o = Xs(e, t), r = ki();
    return (i, l) => (h(), D(Jf, ue(a(o), {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      "disable-outside-scroll": !1,
      onDismiss: l[0] || (l[0] = (u) => a(r).onOpenChange(!1))
    }), {
      default: E(() => [G(i.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Ox = Px, Mx = /* @__PURE__ */ V({
  __name: "MenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const o = Xs(e, t), r = ki(), i = $a();
    return (l, u) => (h(), D(a(Cs), { present: e.forceMount || a(r).open.value }, {
      default: E(() => [a(i).modal.value ? (h(), D(Ax, Nt(ue({ key: 0 }, {
        ...l.$attrs,
        ...a(o)
      })), {
        default: E(() => [G(l.$slots, "default")]),
        _: 3
      }, 16)) : (h(), D(Ox, Nt(ue({ key: 1 }, {
        ...l.$attrs,
        ...a(o)
      })), {
        default: E(() => [G(l.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), qx = Mx, Ix = /* @__PURE__ */ V({
  __name: "MenuPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, s) => (h(), D(a(gi), Nt(gn(t)), {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Rx = Ix;
const [Zf, Dx] = /* @__PURE__ */ Ye("DropdownMenuRoot");
var Fx = /* @__PURE__ */ V({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    dir: {
      type: String,
      required: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    fe();
    const o = /* @__PURE__ */ Rt(n, "open", s, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), r = /* @__PURE__ */ B(), { modal: i, dir: l } = /* @__PURE__ */ it(n), u = _s(l);
    return Dx({
      open: o,
      onOpenChange: (d) => {
        o.value = d;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      triggerId: "",
      triggerElement: r,
      contentId: "",
      modal: i,
      dir: u
    }), (d, c) => (h(), D(a(wx), {
      open: a(o),
      "onUpdate:open": c[0] || (c[0] = (f) => /* @__PURE__ */ et(o) ? o.value = f : null),
      dir: a(u),
      modal: a(i)
    }, {
      default: E(() => [G(d.$slots, "default", { open: a(o) })]),
      _: 3
    }, 8, [
      "open",
      "dir",
      "modal"
    ]));
  }
}), Bx = Fx, Nx = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DropdownMenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const o = Xs(e, t);
    fe();
    const r = Zf(), i = /* @__PURE__ */ B(!1);
    function l(u) {
      u.defaultPrevented || (i.value || setTimeout(() => {
        r.triggerElement.value?.focus();
      }, 0), i.value = !1, u.preventDefault());
    }
    return r.contentId ||= Xn(void 0, "reka-dropdown-menu-content"), (u, d) => (h(), D(a(qx), ue({
      id: a(r).contentId,
      "aria-labelledby": a(r)?.triggerId,
      style: {
        "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
        "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
        "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
      }
    }, {
      ...a(o),
      ...a(iy)(u.$attrs)
    }, {
      onCloseAutoFocus: l,
      onInteractOutside: d[0] || (d[0] = (c) => {
        if (c.defaultPrevented) return;
        const f = c.detail.originalEvent, m = f.button === 0 && f.ctrlKey === !0, p = f.button === 2 || m;
        (!a(r).modal.value || p) && (i.value = !0), a(r).triggerElement.value?.contains(c.target) && c.preventDefault();
      })
    }), {
      default: E(() => [G(u.$slots, "default")]),
      _: 3
    }, 16, ["id", "aria-labelledby"]));
  }
}), Vx = Nx, Lx = /* @__PURE__ */ V({
  __name: "DropdownMenuItem",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = Ko(t);
    return fe(), (r, i) => (h(), D(a(Ex), Nt(gn({
      ...n,
      ...a(o)
    })), {
      default: E(() => [G(r.$slots, "default")]),
      _: 3
    }, 16));
  }
}), zx = Lx, jx = /* @__PURE__ */ V({
  __name: "DropdownMenuPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, s) => (h(), D(a(Rx), Nt(gn(t)), {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Kx = jx, Hx = /* @__PURE__ */ V({
  __name: "DropdownMenuTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = Zf(), { forwardRef: s, currentElement: o } = fe();
    return Ke(() => {
      n.triggerElement = o;
    }), n.triggerId ||= Xn(void 0, "reka-dropdown-menu-trigger"), (r, i) => (h(), D(a(hx), { "as-child": "" }, {
      default: E(() => [O(a(xe), {
        id: a(n).triggerId,
        ref: a(s),
        type: e.as === "button" ? "button" : void 0,
        "as-child": t.asChild,
        as: e.as,
        "aria-haspopup": "menu",
        "aria-expanded": a(n).open.value,
        "aria-controls": a(n).open.value ? a(n).contentId : void 0,
        "data-disabled": e.disabled ? "" : void 0,
        disabled: e.disabled,
        "data-state": a(n).open.value ? "open" : "closed",
        onClick: i[0] || (i[0] = async (l) => {
          l.defaultPrevented || !e.disabled && l.button === 0 && l.ctrlKey === !1 && (a(n)?.onOpenToggle(), await Ue(), a(n).open.value && l.preventDefault());
        }),
        onKeydown: i[1] || (i[1] = nf((l) => {
          e.disabled || l.defaultPrevented || (["Enter", " "].includes(l.key) && a(n).onOpenToggle(), l.key === "ArrowDown" && a(n).onOpenChange(!0), [
            "Enter",
            " ",
            "ArrowDown"
          ].includes(l.key) && l.preventDefault());
        }, [
          "enter",
          "space",
          "arrow-down"
        ]))
      }, {
        default: E(() => [G(r.$slots, "default")]),
        _: 3
      }, 8, [
        "id",
        "type",
        "as-child",
        "as",
        "aria-expanded",
        "aria-controls",
        "data-disabled",
        "disabled",
        "data-state"
      ])]),
      _: 3
    }));
  }
}), Ux = Hx;
let Zi = /* @__PURE__ */ new Map(), Al = !1;
try {
  Al = new Intl.NumberFormat("de-DE", {
    signDisplay: "exceptZero"
  }).resolvedOptions().signDisplay === "exceptZero";
} catch {
}
class Qf {
  constructor(t, n = {}) {
    this.numberFormatter = Wx(t, n), this.options = n;
  }
  /**
  * Formats a number value as a string, according to the locale and options provided to the
  * constructor.
  */
  format(t) {
    let n = "";
    return !Al && this.options.signDisplay != null ? n = Gx(this.numberFormatter, this.options.signDisplay, t) : n = this.numberFormatter.format(t), n;
  }
  /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */
  formatToParts(t) {
    return this.numberFormatter.formatToParts(t);
  }
  /** Formats a number range as a string. */
  formatRange(t, n) {
    if (typeof this.numberFormatter.formatRange == "function") return this.numberFormatter.formatRange(t, n);
    if (n < t) throw new RangeError("End date must be >= start date");
    return `${this.format(t)} – ${this.format(n)}`;
  }
  /** Formats a number range as an array of parts. */
  formatRangeToParts(t, n) {
    if (typeof this.numberFormatter.formatRangeToParts == "function") return this.numberFormatter.formatRangeToParts(t, n);
    if (n < t) throw new RangeError("End date must be >= start date");
    let s = this.numberFormatter.formatToParts(t), o = this.numberFormatter.formatToParts(n);
    return [
      ...s.map((r) => ({
        ...r,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...o.map((r) => ({
        ...r,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let t = this.numberFormatter.resolvedOptions();
    return !Al && this.options.signDisplay != null && (t = {
      ...t,
      signDisplay: this.options.signDisplay
    }), t;
  }
}
function Wx(e, t = {}) {
  let { numberingSystem: n } = t;
  n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`);
  let s = e + (t ? Object.entries(t).sort((r, i) => r[0] < i[0] ? -1 : 1).join() : "");
  if (Zi.has(s)) return Zi.get(s);
  let o = new Intl.NumberFormat(e, t);
  return Zi.set(s, o), o;
}
function Gx(e, t, n) {
  if (t === "auto") return e.format(n);
  if (t === "never") return e.format(Math.abs(n));
  {
    let s = !1;
    if (t === "always" ? s = n > 0 || Object.is(n, 0) : t === "exceptZero" && (Object.is(n, -0) || Object.is(n, 0) ? n = Math.abs(n) : s = n > 0), s) {
      let o = e.format(-n), r = e.format(n), i = o.replace(r, "").replace(/\u200e|\u061C/, "");
      return [
        ...i
      ].length !== 1 && console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"), o.replace(r, "!!!").replace(i, "+").replace("!!!", r);
    } else return e.format(n);
  }
}
const Yx = new RegExp("^.*\\(.*\\).*$"), Xx = [
  "latn",
  "arab",
  "hanidec",
  "deva",
  "beng",
  "fullwide"
];
class ep {
  constructor(t, n = {}) {
    this.locale = t, this.options = n;
  }
  /**
  * Parses the given string to a number. Returns NaN if a valid number could not be parsed.
  */
  parse(t) {
    return Qi(this.locale, this.options, t).parse(t);
  }
  /**
  * Returns whether the given string could potentially be a valid number. This should be used to
  * validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
  * of the minus/plus sign characters can be checked.
  */
  isValidPartialNumber(t, n, s) {
    return Qi(this.locale, this.options, t).isValidPartialNumber(t, n, s);
  }
  /**
  * Returns a numbering system for which the given string is valid in the current locale.
  * If no numbering system could be detected, the default numbering system for the current
  * locale is returned.
  */
  getNumberingSystem(t) {
    return Qi(this.locale, this.options, t).options.numberingSystem;
  }
}
const ju = /* @__PURE__ */ new Map();
function Qi(e, t, n) {
  let s = Ku(e, t);
  if (!e.includes("-nu-") && !s.isValidPartialNumber(n)) {
    for (let o of Xx) if (o !== s.options.numberingSystem) {
      let r = Ku(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + o, t);
      if (r.isValidPartialNumber(n)) return r;
    }
  }
  return s;
}
function Ku(e, t) {
  let n = e + (t ? Object.entries(t).sort((o, r) => o[0] < r[0] ? -1 : 1).join() : ""), s = ju.get(n);
  return s || (s = new Jx(e, t), ju.set(n, s)), s;
}
class Jx {
  constructor(t, n = {}) {
    this.locale = t, n.roundingIncrement !== 1 && n.roundingIncrement != null && (n.maximumFractionDigits == null && n.minimumFractionDigits == null ? (n.maximumFractionDigits = 0, n.minimumFractionDigits = 0) : n.maximumFractionDigits == null ? n.maximumFractionDigits = n.minimumFractionDigits : n.minimumFractionDigits == null && (n.minimumFractionDigits = n.maximumFractionDigits)), this.formatter = new Intl.NumberFormat(t, n), this.options = this.formatter.resolvedOptions(), this.symbols = Zx(t, this.formatter, this.options, n), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
  }
  parse(t) {
    let n = this.formatter.resolvedOptions().useGrouping, s = this.sanitize(t);
    if (!n && this.symbols.group && s.includes(this.symbols.group)) return NaN;
    if (this.symbols.group && (s = s.replaceAll(this.symbols.group, "")), this.symbols.decimal && (s = s.replace(this.symbols.decimal, ".")), this.symbols.minusSign && (s = s.replace(this.symbols.minusSign, "-")), s = s.replace(this.symbols.numeral, this.symbols.index), this.options.style === "percent") {
      let r = s.indexOf("-");
      s = s.replace("-", ""), s = s.replace("+", "");
      let i = s.indexOf(".");
      i === -1 && (i = s.length), s = s.replace(".", ""), i - 2 === 0 ? s = `0.${s}` : i - 2 === -1 ? s = `0.0${s}` : i - 2 === -2 ? s = "0.00" : s = `${s.slice(0, i - 2)}.${s.slice(i - 2)}`, r > -1 && (s = `-${s}`);
    }
    let o = s ? +s : NaN;
    if (isNaN(o)) return NaN;
    if (this.options.style === "percent") {
      let r = {
        ...this.options,
        style: "decimal",
        minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
        maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
      };
      return new ep(this.locale, r).parse(new Qf(this.locale, r).format(o));
    }
    return this.options.currencySign === "accounting" && Yx.test(t) && (o = -1 * o), o;
  }
  sanitize(t) {
    let n = this.formatter.resolvedOptions().useGrouping;
    return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((s) => s.unit === t) ? this.symbols.noNumeralUnits.find((s) => s.unit === t).value.toString() : (t = t.replace(this.symbols.literals, ""), this.symbols.minusSign && (t = t.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (t = In(t, ",", this.symbols.decimal), t = In(t, "،", this.symbols.decimal)), this.symbols.group && n && (t = In(t, ".", this.symbols.group))), this.symbols.group === "’" && t.includes("'") && n && (t = In(t, "'", this.symbols.group)), this.symbols.group === "'" && t.includes("’") && n && (t = In(t, "’", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && n && (t = In(t, " ", this.symbols.group), t = In(t, /\u00A0/g, this.symbols.group)), t);
  }
  isValidPartialNumber(t, n = -1 / 0, s = 1 / 0) {
    let o = this.formatter.resolvedOptions().useGrouping;
    return t = this.sanitize(t), this.symbols.minusSign && t.startsWith(this.symbols.minusSign) && n < 0 ? t = t.slice(this.symbols.minusSign.length) : this.symbols.plusSign && t.startsWith(this.symbols.plusSign) && s > 0 && (t = t.slice(this.symbols.plusSign.length)), this.symbols.decimal && t.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? !1 : (this.symbols.group && o && (t = In(t, this.symbols.group, "")), t = t.replace(this.symbols.numeral, ""), this.symbols.decimal && (t = t.replace(this.symbols.decimal, "")), t.length === 0);
  }
}
const Hu = /* @__PURE__ */ new Set([
  "decimal",
  "fraction",
  "integer",
  "minusSign",
  "plusSign",
  "group"
]), Uu = [
  0,
  4,
  2,
  1,
  11,
  20,
  3,
  7,
  100,
  21,
  0.1,
  1.1
];
function Zx(e, t, n, s) {
  let o = new Intl.NumberFormat(e, {
    ...n,
    // Resets so we get the full range of symbols
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 21,
    roundingIncrement: 1,
    roundingPriority: "auto",
    roundingMode: "halfExpand",
    useGrouping: !0
  }), r = o.formatToParts(-10000.111), i = o.formatToParts(10000.111), l = Uu.map(($) => o.formatToParts($)), u = l.map(($, S) => {
    let k = $.find((M) => M.type === "unit");
    return k && !$.some((M) => M.type === "integer" || M.type === "fraction") ? {
      unit: k.value,
      value: Uu[S]
    } : null;
  }).filter(($) => !!$), d = r.find(($) => $.type === "minusSign")?.value ?? "-", c = i.find(($) => $.type === "plusSign")?.value;
  !c && (s?.signDisplay === "exceptZero" || s?.signDisplay === "always") && (c = "+");
  let m = new Intl.NumberFormat(e, {
    ...n,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).formatToParts(1e-3).find(($) => $.type === "decimal")?.value, p = r.find(($) => $.type === "group")?.value, g = r.filter(($) => !Hu.has($.type)).map(($) => Wu($.value)), b = l.flatMap(($) => $.filter((S) => !Hu.has(S.type)).map((S) => Wu(S.value))), w = [
    .../* @__PURE__ */ new Set([
      ...g,
      ...b
    ])
  ].sort(($, S) => S.length - $.length), x = w.length === 0 ? new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${w.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), y = [
    ...new Intl.NumberFormat(n.locale, {
      useGrouping: !1
    }).format(9876543210)
  ].reverse(), v = new Map(y.map(($, S) => [
    $,
    S
  ])), C = new RegExp(`[${y.join("")}]`, "g");
  return {
    minusSign: d,
    plusSign: c,
    decimal: m,
    group: p,
    literals: x,
    numeral: C,
    numerals: y,
    index: ($) => String(v.get($)),
    noNumeralUnits: u
  };
}
function In(e, t, n) {
  return e.replaceAll ? e.replaceAll(t, n) : e.split(t).join(n);
}
function Wu(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const Gu = 400, Qx = 60, ew = 10;
function tp(e) {
  const { disabled: t } = e, n = /* @__PURE__ */ B(), s = /* @__PURE__ */ af(), o = /* @__PURE__ */ B(!1), r = q(() => It(e.target));
  let i, l = "", u = 0, d = 0, c = !1;
  const f = () => {
    n.value !== void 0 && (window.clearTimeout(n.value), n.value = void 0);
  }, m = () => {
    f(), i = void 0, l = "", c = !1, o.value = !1;
  }, p = () => t.value ? (m(), !1) : (s.trigger(), !0), g = (v) => {
    f(), n.value = window.setTimeout(() => {
      c = !0, p() && g(Qx);
    }, v);
  }, b = (v) => {
    if (!(v.button !== 0 || o.value || t.value)) {
      if (v.preventDefault(), i = v.pointerId, l = v.pointerType, u = v.clientX, d = v.clientY, c = !1, o.value = !0, v.pointerType === "mouse") {
        c = !0, p() && g(Gu);
        return;
      }
      g(Gu);
    }
  }, w = (v) => {
    if (v.pointerId !== i || l === "mouse") return;
    const C = v.clientX - u, F = v.clientY - d;
    C * C + F * F > ew ** 2 && m();
  }, x = (v) => {
    if (v.pointerId !== i) return;
    const C = l !== "mouse" && !c;
    m(), C && p();
  }, y = (v) => {
    v.pointerId === i && m();
  };
  return $t && (Ft(r || window, "pointerdown", b), Ft(window, "pointermove", w), Ft(window, "pointerup", x), Ft(window, "pointercancel", y)), ni(m), {
    isPressed: o,
    onTrigger: s.on
  };
}
function Yu(e, t = /* @__PURE__ */ B({})) {
  return oa(() => new Qf(e.value, t.value));
}
function tw(e, t = /* @__PURE__ */ B({})) {
  return oa(() => new ep(e.value, t.value));
}
function io(e, t, n) {
  let s = e === "+" ? t + n : t - n;
  if (t % 1 !== 0 || n % 1 !== 0) {
    const o = t.toString().split("."), r = n.toString().split("."), i = o[1] && o[1].length || 0, l = r[1] && r[1].length || 0, u = 10 ** Math.max(i, l);
    t = Math.round(t * u), n = Math.round(n * u), s = e === "+" ? t + n : t - n, s /= u;
  }
  return s;
}
const [Ea, nw] = /* @__PURE__ */ Ye("NumberFieldRoot");
var sw = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "NumberFieldRoot",
  props: {
    defaultValue: {
      type: Number,
      required: !1,
      default: void 0
    },
    modelValue: {
      type: [Number, null],
      required: !1
    },
    min: {
      type: Number,
      required: !1
    },
    max: {
      type: Number,
      required: !1
    },
    step: {
      type: Number,
      required: !1,
      default: 1
    },
    stepSnapping: {
      type: Boolean,
      required: !1,
      default: !0
    },
    allowInvalid: {
      type: Boolean,
      required: !1
    },
    focusOnChange: {
      type: Boolean,
      required: !1,
      default: !0
    },
    formatOptions: {
      type: null,
      required: !1
    },
    locale: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    readonly: {
      type: Boolean,
      required: !1
    },
    disableWheelChange: {
      type: Boolean,
      required: !1
    },
    invertWheelChange: {
      type: Boolean,
      required: !1
    },
    id: {
      type: String,
      required: !1
    },
    startingValue: {
      type: Number,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "div"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, { disabled: o, readonly: r, disableWheelChange: i, invertWheelChange: l, min: u, max: d, step: c, stepSnapping: f, allowInvalid: m, formatOptions: p, id: g, locale: b, startingValue: w } = /* @__PURE__ */ it(n), x = /* @__PURE__ */ Rt(n, "modelValue", s, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), { primitiveElement: y, currentElement: v } = vs(), C = Tv(b), F = Gs(v), $ = /* @__PURE__ */ B(), S = q(() => Fs(x.value) || isNaN(x.value) ? !1 : M("decrease", x.value) >= x.value), k = q(() => Fs(x.value) || isNaN(x.value) ? !1 : M("increase", x.value) <= x.value);
    function M(we, Pe, Fe = 1) {
      const Oe = c.value ?? 1, Xe = we === "increase" ? "+" : "-";
      let at;
      if (f.value && !isNaN(Oe)) {
        const ke = _u(Pe, u.value, d.value, Oe);
        if (ke === Pe) at = io(Xe, Pe, Oe * Fe);
        else {
          const _t = we === "increase" ? ke > Pe ? ke : io("+", ke, Oe) : ke < Pe ? ke : io("-", ke, Oe);
          at = Fe > 1 ? io(Xe, _t, Oe * (Fe - 1)) : _t;
        }
      } else at = io(Xe, Pe, Oe * Fe);
      return tt(at);
    }
    function I(we, Pe = 1) {
      if (n.focusOnChange && $.value?.focus(), n.disabled || n.readonly) return;
      const Fe = H.parse($.value?.value ?? "");
      if (isNaN(Fe)) {
        x.value = w.value === void 0 ? tt(u.value ?? 0) : H.parse(ge.format(Ls(w.value, u.value, d.value)));
        return;
      }
      const Oe = M(we, Fe, Pe);
      (we === "increase" ? Oe < Fe : Oe > Fe) || (x.value = Oe);
    }
    function L(we = 1) {
      I("increase", we);
    }
    function se(we = 1) {
      I("decrease", we);
    }
    function ie(we) {
      we === "min" && u.value !== void 0 ? x.value = tt(u.value) : we === "max" && d.value !== void 0 && (x.value = tt(d.value));
    }
    const ge = Yu(C, p), H = tw(C, p), J = q(() => ge.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric"), ae = Yu(C, p), $e = q(() => Fs(x.value) || isNaN(x.value) ? "" : ae.format(x.value));
    function Me(we) {
      return m.value ? H.isValidPartialNumber(we) : H.isValidPartialNumber(we, u.value, d.value);
    }
    function ne(we) {
      $.value && ($.value.value = we);
    }
    function tt(we) {
      let Pe;
      return c.value === void 0 || isNaN(c.value) || !f.value ? Pe = Ls(we, u.value, d.value) : Pe = _u(we, u.value, d.value, c.value), Pe = H.parse(ge.format(Pe)), Pe;
    }
    function He(we) {
      const Pe = H.parse(we);
      return isNaN(Pe) ? x.value = void 0 : m.value ? x.value = H.parse(ge.format(Pe)) : x.value = tt(Pe), we.length ? (isNaN(Pe), ne($e.value)) : ne(we);
    }
    return nw({
      modelValue: x,
      handleDecrease: se,
      handleIncrease: L,
      handleMinMaxValue: ie,
      inputMode: J,
      inputEl: $,
      onInputElement: (we) => $.value = we,
      textValue: $e,
      readonly: r,
      validate: Me,
      applyInputValue: He,
      disabled: o,
      disableWheelChange: i,
      invertWheelChange: l,
      max: d,
      min: u,
      isDecreaseDisabled: S,
      isIncreaseDisabled: k,
      id: g
    }), (we, Pe) => (h(), D(a(xe), ue(we.$attrs, {
      ref_key: "primitiveElement",
      ref: y,
      role: "group",
      as: e.as,
      "as-child": e.asChild,
      "data-disabled": a(o) ? "" : void 0,
      "data-readonly": a(r) ? "" : void 0
    }), {
      default: E(() => [G(we.$slots, "default", {
        modelValue: a(x),
        textValue: $e.value,
        readonly: a(r)
      }), a(F) && e.name ? (h(), D(a(Uo), {
        key: 0,
        type: "text",
        value: a(x),
        name: e.name,
        disabled: a(o),
        readonly: a(r),
        required: e.required
      }, null, 8, [
        "value",
        "name",
        "disabled",
        "readonly",
        "required"
      ])) : Y("v-if", !0)]),
      _: 3
    }, 16, [
      "as",
      "as-child",
      "data-disabled",
      "data-readonly"
    ]));
  }
}), ow = sw, rw = /* @__PURE__ */ V({
  __name: "NumberFieldDecrement",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = Ea(), s = q(() => n.disabled?.value || n.readonly.value || t.disabled || n.isDecreaseDisabled.value), { primitiveElement: o, currentElement: r } = vs(), { isPressed: i, onTrigger: l } = tp({
      target: r,
      disabled: s
    });
    return l(() => {
      n.handleDecrease();
    }), (u, d) => (h(), D(a(xe), ue(t, {
      ref_key: "primitiveElement",
      ref: o,
      tabindex: "-1",
      "aria-label": "Decrease",
      type: e.as === "button" ? "button" : void 0,
      style: { userSelect: a(i) ? "none" : void 0 },
      disabled: s.value ? "" : void 0,
      "data-disabled": s.value ? "" : void 0,
      "data-pressed": a(i) ? "true" : void 0,
      onContextmenu: d[0] || (d[0] = Gt(() => {
      }, ["prevent"]))
    }), {
      default: E(() => [G(u.$slots, "default")]),
      _: 3
    }, 16, [
      "type",
      "style",
      "disabled",
      "data-disabled",
      "data-pressed"
    ]));
  }
}), iw = rw, lw = /* @__PURE__ */ V({
  __name: "NumberFieldIncrement",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = Ea(), s = q(() => n.disabled?.value || n.readonly.value || t.disabled || n.isIncreaseDisabled.value), { primitiveElement: o, currentElement: r } = vs(), { isPressed: i, onTrigger: l } = tp({
      target: r,
      disabled: s
    });
    return l(() => {
      n.handleIncrease();
    }), (u, d) => (h(), D(a(xe), ue(t, {
      ref_key: "primitiveElement",
      ref: o,
      tabindex: "-1",
      "aria-label": "Increase",
      type: e.as === "button" ? "button" : void 0,
      style: { userSelect: a(i) ? "none" : void 0 },
      disabled: s.value ? "" : void 0,
      "data-disabled": s.value ? "" : void 0,
      "data-pressed": a(i) ? "true" : void 0,
      onContextmenu: d[0] || (d[0] = Gt(() => {
      }, ["prevent"]))
    }), {
      default: E(() => [G(u.$slots, "default")]),
      _: 3
    }, 16, [
      "type",
      "style",
      "disabled",
      "data-disabled",
      "data-pressed"
    ]));
  }
}), aw = lw, uw = /* @__PURE__ */ V({
  __name: "NumberFieldInput",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "input"
    }
  },
  setup(e) {
    const t = e, { primitiveElement: n, currentElement: s } = vs(), o = Ea(), r = Ev(), { isComposing: i, handleCompositionStart: l, handleCompositionEnd: u } = hv();
    function d(p) {
      if (!(i.value || p.isComposing))
        switch (p.key) {
          case r.ARROW_UP:
            p.preventDefault(), o.handleIncrease();
            break;
          case r.ARROW_DOWN:
            p.preventDefault(), o.handleDecrease();
            break;
          case r.PAGE_UP:
            p.preventDefault(), o.handleIncrease(10);
            break;
          case r.PAGE_DOWN:
            p.preventDefault(), o.handleDecrease(10);
            break;
          case r.HOME:
            p.preventDefault(), o.handleMinMaxValue("min");
            break;
          case r.END:
            p.preventDefault(), o.handleMinMaxValue("max");
            break;
          case r.ENTER:
            o.applyInputValue(p.target?.value);
            break;
        }
    }
    function c(p) {
      o.disableWheelChange.value || p.target === Ge() && (Math.abs(p.deltaY) <= Math.abs(p.deltaX) || (p.preventDefault(), p.deltaY > 0 ? o.invertWheelChange.value ? o.handleDecrease() : o.handleIncrease() : p.deltaY < 0 && (o.invertWheelChange.value ? o.handleIncrease() : o.handleDecrease())));
    }
    Ke(() => {
      o.onInputElement(s.value);
    });
    const f = /* @__PURE__ */ B(o.textValue.value);
    ve(() => o.textValue.value, () => {
      f.value = o.textValue.value;
    }, {
      immediate: !0,
      deep: !0
    });
    function m() {
      requestAnimationFrame(() => {
        f.value = o.textValue.value;
      });
    }
    return (p, g) => (h(), D(a(xe), ue(t, {
      id: a(o).id.value,
      ref_key: "primitiveElement",
      ref: n,
      value: f.value,
      role: "spinbutton",
      type: "text",
      tabindex: "0",
      inputmode: a(o).inputMode.value,
      disabled: a(o).disabled.value ? "" : void 0,
      "data-disabled": a(o).disabled.value ? "" : void 0,
      readonly: a(o).readonly.value ? "" : void 0,
      "data-readonly": a(o).readonly.value ? "" : void 0,
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: "false",
      "aria-roledescription": "Number field",
      "aria-valuenow": a(o).modelValue.value,
      "aria-valuemin": a(o).min.value,
      "aria-valuemax": a(o).max.value,
      onKeydown: d,
      onWheel: c,
      onBeforeinput: g[0] || (g[0] = (b) => {
        if (b.isComposing || b.inputType.startsWith("delete") || b.inputType.startsWith("history")) return;
        const w = b.target;
        let x = w.value.slice(0, w.selectionStart ?? void 0) + (b.data ?? "") + w.value.slice(w.selectionEnd ?? void 0);
        a(o).validate(x) || b.preventDefault();
      }),
      onInput: g[1] || (g[1] = (b) => {
        const w = b.target;
        f.value = w.value;
      }),
      onChange: m,
      onBlur: g[2] || (g[2] = (b) => a(o).applyInputValue(b.target?.value)),
      onCompositionstart: a(l),
      onCompositionend: a(u)
    }), {
      default: E(() => [G(p.$slots, "default")]),
      _: 3
    }, 16, [
      "id",
      "value",
      "inputmode",
      "disabled",
      "data-disabled",
      "readonly",
      "data-readonly",
      "aria-valuenow",
      "aria-valuemin",
      "aria-valuemax",
      "onCompositionstart",
      "onCompositionend"
    ]));
  }
}), dw = uw;
const cw = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
], fw = [" ", "Enter"], Kt = 10;
function Do(e, t, n) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((s) => Pl(s, t, n)) : Pl(e, t, n);
}
function Pl(e, t, n) {
  return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : qo(e, t);
}
function pw(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
const mw = ["value"], [ts, np] = /* @__PURE__ */ Ye("SelectRoot");
var hw = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SelectRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1,
      default: void 0
    },
    nullableValue: {
      type: String,
      required: !1,
      default: ""
    },
    by: {
      type: [String, Function],
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    autocomplete: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: t }) {
    const n = e, s = t, { multiple: o, dir: r } = /* @__PURE__ */ it(n), i = Nf(null), l = q(() => n.name ?? i?.name.value), u = q(() => i ? n.required || i.required.value : n.required), d = q(() => !!(n.disabled || i?.disabled.value)), c = /* @__PURE__ */ Rt(n, "modelValue", s, {
      defaultValue: n.defaultValue ?? (o.value ? [] : void 0),
      passive: n.modelValue === void 0,
      deep: !0
    }), f = /* @__PURE__ */ Rt(n, "open", s, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), m = /* @__PURE__ */ B(), p = /* @__PURE__ */ B(), g = /* @__PURE__ */ B({
      x: 0,
      y: 0
    }), b = q(() => o.value && Array.isArray(c.value) ? c.value?.length === 0 : Fs(c.value));
    ve(c, () => {
      i?.reportControlState({ filled: !b.value });
    }), Et({ isProvider: !0 });
    const w = _s(r), x = Gs(m), y = /* @__PURE__ */ B(/* @__PURE__ */ new Set()), v = q(() => Array.from(y.value).map(($) => $.value).join(";"));
    function C($) {
      let S;
      if (o.value) {
        const k = Array.isArray(c.value) ? [...c.value] : [], M = k.findIndex((I) => Pl(I, $, n.by));
        M === -1 ? k.push($) : k.splice(M, 1), S = [...k];
      } else S = $;
      c.value = S, i?.handleControlInput({ value: S });
    }
    function F($) {
      return Array.from(y.value).find((S) => Do($, S.value, n.by));
    }
    return np({
      triggerElement: m,
      onTriggerChange: ($) => {
        m.value = $;
      },
      valueElement: p,
      onValueElementChange: ($) => {
        p.value = $;
      },
      contentId: "",
      modelValue: c,
      onValueChange: C,
      by: n.by,
      open: f,
      multiple: o,
      required: u,
      onOpenChange: ($) => {
        f.value = $;
      },
      dir: w,
      triggerPointerDownPosRef: g,
      disabled: d,
      isEmptyModelValue: b,
      optionsSet: y,
      onOptionAdd: ($) => {
        const S = F($.value);
        S && y.value.delete(S), y.value.add($);
      },
      onOptionRemove: ($) => {
        const S = F($.value);
        S && y.value.delete(S);
      }
    }), ($, S) => (h(), D(a(ha), null, {
      default: E(() => [G($.$slots, "default", {
        modelValue: a(c),
        open: a(f)
      }), a(x) && l.value ? (h(), D(yw, {
        key: v.value,
        "aria-hidden": "true",
        tabindex: "-1",
        multiple: a(o),
        required: u.value,
        name: l.value,
        autocomplete: e.autocomplete,
        disabled: d.value,
        value: a(c)
      }, {
        default: E(() => [a(Fs)(a(c)) ? (h(), A("option", {
          key: 0,
          value: e.nullableValue
        }, null, 8, mw)) : Y("v-if", !0), (h(!0), A(W, null, pe(Array.from(y.value), (k) => (h(), A("option", ue({ key: k.value ?? "" }, { ref_for: !0 }, k), null, 16))), 128))]),
        _: 1
      }, 8, [
        "multiple",
        "required",
        "name",
        "autocomplete",
        "disabled",
        "value"
      ])) : Y("v-if", !0)]),
      _: 3
    }));
  }
}), gw = hw, vw = /* @__PURE__ */ V({
  __name: "BubbleSelect",
  props: {
    autocomplete: {
      type: String,
      required: !1
    },
    autofocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    form: {
      type: String,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    },
    size: {
      type: Number,
      required: !1
    },
    value: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ B(), s = ts();
    ve(() => t.value, (r, i) => {
      const l = window.HTMLSelectElement.prototype, d = Object.getOwnPropertyDescriptor(l, "value").set;
      if (r !== i && d && n.value) {
        const c = new Event("change", { bubbles: !0 });
        d.call(n.value, r), n.value.dispatchEvent(c);
      }
    });
    function o(r) {
      s.onValueChange(r.target.value);
    }
    return (r, i) => (h(), D(a(Ho), { "as-child": "" }, {
      default: E(() => [T("select", ue({
        ref_key: "selectElement",
        ref: n
      }, t, { onInput: o }), [G(r.$slots, "default")], 16)]),
      _: 3
    }));
  }
}), yw = vw, bw = /* @__PURE__ */ V({
  __name: "SelectPopperPosition",
  props: {
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1,
      default: Kt
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = Ys(e);
    return (s, o) => (h(), D(a(Ca), ue(a(n), { style: {
      boxSizing: "border-box",
      "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-select-content-available-width": "var(--reka-popper-available-width)",
      "--reka-select-content-available-height": "var(--reka-popper-available-height)",
      "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
    } }), {
      default: E(() => [G(s.$slots, "default")]),
      _: 3
    }, 16));
  }
}), xw = bw;
const ww = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [_i, sp] = /* @__PURE__ */ Ye("SelectContent");
var kw = /* @__PURE__ */ V({
  __name: "SelectContentImpl",
  props: {
    position: {
      type: String,
      required: !1,
      default: "item-aligned"
    },
    bodyLock: {
      type: Boolean,
      required: !1,
      default: !0
    },
    loop: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, o = ts();
    vf(), ua(n.bodyLock);
    const { CollectionSlot: r, getItems: i } = Et(), l = /* @__PURE__ */ B();
    ca(l);
    const { search: u, handleTypeaheadSearch: d } = fa(), c = /* @__PURE__ */ B(), f = /* @__PURE__ */ B(), m = /* @__PURE__ */ B(), p = /* @__PURE__ */ B(!1), g = /* @__PURE__ */ B(!1), b = /* @__PURE__ */ B(!1);
    function w() {
      f.value && l.value && Cl([f.value, l.value]);
    }
    ve(p, () => {
      w();
    });
    const { onOpenChange: x, triggerPointerDownPosRef: y } = o;
    kt((S) => {
      if (!l.value) return;
      let k = {
        x: 0,
        y: 0
      };
      const M = (L) => {
        k = {
          x: Math.abs(Math.round(L.pageX) - (y.value?.x ?? 0)),
          y: Math.abs(Math.round(L.pageY) - (y.value?.y ?? 0))
        };
      }, I = (L) => {
        L.pointerType !== "touch" && (k.x <= 10 && k.y <= 10 ? L.preventDefault() : l.value?.contains(L.target) || x(!1), document.removeEventListener("pointermove", M), y.value = null);
      };
      y.value !== null && (document.addEventListener("pointermove", M), document.addEventListener("pointerup", I, {
        capture: !0,
        once: !0
      })), S(() => {
        document.removeEventListener("pointermove", M), document.removeEventListener("pointerup", I, { capture: !0 });
      });
    });
    function v(S) {
      const k = S.ctrlKey || S.altKey || S.metaKey;
      if (S.key === "Tab" && S.preventDefault(), S.code === "Space") {
        if (u.value === "") return;
        S.preventDefault();
      }
      if (!k && S.key.length === 1 && d(S.key, i()), [
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(S.key)) {
        let I = [...i().map((L) => L.ref)];
        if (["ArrowUp", "End"].includes(S.key) && (I = I.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(S.key)) {
          const L = S.target, se = I.indexOf(L);
          I = n.loop ? xf(I, se + 1) : I.slice(se + 1);
        }
        setTimeout(() => Cl(I)), S.preventDefault();
      }
    }
    const C = ev(n, "loop"), F = q(() => n.position === "popper" ? C : {}), $ = Ys(F.value);
    return sp({
      content: l,
      viewport: c,
      onViewportChange: (S) => {
        c.value = S;
      },
      itemRefCallback: (S, k, M) => {
        const I = !g.value && !M, L = Do(o.modelValue.value, k, o.by);
        if (o.multiple.value) {
          if (b.value) return;
          (L || I) && (f.value = S, L && (b.value = !0));
        } else (L || I) && (f.value = S);
        I && (g.value = !0);
      },
      selectedItem: f,
      selectedItemText: m,
      onItemLeave: () => {
        l.value?.focus();
      },
      itemTextRefCallback: (S, k, M) => {
        const I = !g.value && !M;
        (Do(o.modelValue.value, k, o.by) || I) && (m.value = S);
      },
      focusSelectedItem: w,
      position: n.position,
      isPositioned: p,
      searchRef: u
    }), (S, k) => (h(), D(a(r), null, {
      default: E(() => [O(a(ma), {
        "as-child": "",
        onMountAutoFocus: k[6] || (k[6] = Gt(() => {
        }, ["prevent"])),
        onUnmountAutoFocus: k[7] || (k[7] = (M) => {
          s("closeAutoFocus", M), !M.defaultPrevented && (a(o).triggerElement.value?.focus({ preventScroll: !0 }), M.preventDefault());
        })
      }, {
        default: E(() => [O(a(hi), {
          "as-child": "",
          "disable-outside-pointer-events": e.disableOutsidePointerEvents,
          onFocusOutside: k[2] || (k[2] = Gt(() => {
          }, ["prevent"])),
          onDismiss: k[3] || (k[3] = (M) => a(o).onOpenChange(!1)),
          onEscapeKeyDown: k[4] || (k[4] = (M) => s("escapeKeyDown", M)),
          onPointerDownOutside: k[5] || (k[5] = (M) => s("pointerDownOutside", M))
        }, {
          default: E(() => [(h(), D(ws(e.position === "popper" ? xw : Ew), ue({
            ...S.$attrs,
            ...a($)
          }, {
            id: a(o).contentId,
            ref: (M) => {
              if (!M) return;
              const I = a(It)(M);
              I?.hasAttribute("data-reka-popper-content-wrapper") ? l.value = I.firstElementChild : l.value = I;
            },
            role: "listbox",
            "data-state": a(o).open.value ? "open" : "closed",
            dir: a(o).dir.value,
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none"
            },
            onContextmenu: k[0] || (k[0] = Gt(() => {
            }, ["prevent"])),
            onPlaced: k[1] || (k[1] = (M) => p.value = !0),
            onKeydown: v
          }), {
            default: E(() => [G(S.$slots, "default")]),
            _: 3
          }, 16, [
            "id",
            "data-state",
            "dir",
            "onKeydown"
          ]))]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      })]),
      _: 3
    }));
  }
}), _w = kw;
const [Cw, Sw] = /* @__PURE__ */ Ye("SelectItemAlignedPosition");
var $w = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, s = t, { getItems: o } = Et(), r = ts(), i = _i(), l = /* @__PURE__ */ B(!1), u = /* @__PURE__ */ B(!0), d = /* @__PURE__ */ B(), { forwardRef: c, currentElement: f } = fe(), { viewport: m, selectedItem: p, selectedItemText: g, focusSelectedItem: b } = i;
    function w() {
      if (r.triggerElement.value && r.valueElement.value && d.value && f.value && m?.value && p?.value && g?.value) {
        const v = r.triggerElement.value.getBoundingClientRect(), C = f.value.getBoundingClientRect(), F = r.valueElement.value.getBoundingClientRect(), $ = g.value.getBoundingClientRect();
        if (r.dir.value !== "rtl") {
          const Xe = $.left - C.left, at = F.left - Xe, ke = v.left - at, _t = v.width + ke, _ = Math.max(_t, C.width), P = window.innerWidth - Kt, N = Ls(at, Kt, Math.max(Kt, P - _));
          d.value.style.minWidth = `${_t}px`, d.value.style.left = `${N}px`;
        } else {
          const Xe = C.right - $.right, at = window.innerWidth - F.right - Xe, ke = window.innerWidth - v.right - at, _t = v.width + ke, _ = Math.max(_t, C.width), P = window.innerWidth - Kt, N = Ls(at, Kt, Math.max(Kt, P - _));
          d.value.style.minWidth = `${_t}px`, d.value.style.right = `${N}px`;
        }
        const S = o().map((Xe) => Xe.ref), k = window.innerHeight - Kt * 2, M = m.value.scrollHeight, I = window.getComputedStyle(f.value), L = Number.parseInt(I.borderTopWidth, 10), se = Number.parseInt(I.paddingTop, 10), ie = Number.parseInt(I.borderBottomWidth, 10), ge = Number.parseInt(I.paddingBottom, 10), H = L + se + M + ge + ie, J = Math.min(p.value.offsetHeight * 5, H), ae = window.getComputedStyle(m.value), $e = Number.parseInt(ae.paddingTop, 10), Me = Number.parseInt(ae.paddingBottom, 10), ne = v.top + v.height / 2 - Kt, tt = k - ne, He = p.value.offsetHeight / 2, we = p.value.offsetTop + He, Pe = L + se + we, Fe = H - Pe;
        if (Pe <= ne) {
          const Xe = p.value === S.at(-1);
          d.value.style.bottom = "0px";
          const at = f.value.clientHeight - m.value.offsetTop - m.value.offsetHeight, ke = Math.max(tt, He + (Xe ? Me : 0) + at + ie), _t = Pe + ke;
          d.value.style.height = `${_t}px`;
        } else {
          const Xe = p.value === S[0];
          d.value.style.top = "0px";
          const ke = Math.max(ne, L + m.value.offsetTop + (Xe ? $e : 0) + He) + Fe;
          d.value.style.height = `${ke}px`, m.value.scrollTop = Pe - ne + m.value.offsetTop;
        }
        d.value.style.margin = `${Kt}px 0`, d.value.style.minHeight = `${J}px`, d.value.style.maxHeight = `${k}px`, s("placed"), requestAnimationFrame(() => l.value = !0);
      }
    }
    const x = /* @__PURE__ */ B("");
    Ke(async () => {
      await Ue(), w(), f.value && (x.value = window.getComputedStyle(f.value).zIndex);
    });
    function y(v) {
      v && u.value === !0 && (w(), b?.(), u.value = !1);
    }
    return cf(r.triggerElement, () => {
      w();
    }), Sw({
      contentWrapper: d,
      shouldExpandOnScrollRef: l,
      onScrollButtonChange: y
    }), (v, C) => (h(), A("div", {
      ref_key: "contentWrapperElement",
      ref: d,
      style: Ie({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: x.value
      })
    }, [O(a(xe), ue({
      ref: a(c),
      style: {
        boxSizing: "border-box",
        maxHeight: "100%"
      }
    }, {
      ...v.$attrs,
      ...n
    }), {
      default: E(() => [G(v.$slots, "default")]),
      _: 3
    }, 16)], 4));
  }
}), Ew = $w, Tw = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: !0
  } },
  setup(e) {
    return np(e.context), sp(ww), (n, s) => G(n.$slots, "default");
  }
}), Aw = Tw;
const Pw = { key: 1 };
var Ow = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SelectContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    position: {
      type: String,
      required: !1
    },
    bodyLock: {
      type: Boolean,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1
    },
    memoDependencies: {
      type: Array,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    hideShiftedArrow: {
      type: Boolean,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: t }) {
    const n = e, o = Xs(n, t), r = ts(), i = /* @__PURE__ */ B();
    Ke(() => {
      i.value = new DocumentFragment();
    });
    const l = /* @__PURE__ */ B(), u = q(() => n.forceMount || r.open.value), d = /* @__PURE__ */ B(u.value);
    let c;
    function f() {
      c && (clearTimeout(c), c = void 0);
    }
    return ve(u, (m, p, g) => {
      f(), c = setTimeout(() => {
        d.value = u.value, c = void 0;
      }), g(f);
    }), hn(f), (m, p) => u.value || d.value || l.value?.present ? (h(), D(a(Cs), {
      key: 0,
      ref_key: "presenceRef",
      ref: l,
      present: u.value
    }, {
      default: E(() => [O(_w, Nt(gn({
        ...a(o),
        ...m.$attrs
      })), {
        default: E(() => [G(m.$slots, "default")]),
        _: 3
      }, 16)]),
      _: 3
    }, 8, ["present"])) : i.value ? (h(), A("div", Pw, [(h(), D(Yl, { to: i.value }, [O(Aw, { context: a(r) }, {
      default: E(() => [G(m.$slots, "default")]),
      _: 3
    }, 8, ["context"])], 8, ["to"]))])) : Y("v-if", !0);
  }
}), Mw = Ow;
const [op, qw] = /* @__PURE__ */ Ye("SelectItem");
var Iw = /* @__PURE__ */ V({
  __name: "SelectItem",
  props: {
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, s = t, { disabled: o } = /* @__PURE__ */ it(n), r = ts(), i = _i(), { forwardRef: l, currentElement: u } = fe(), { CollectionItem: d } = Et(), c = q(() => Do(r.modelValue?.value, n.value, r.by)), f = /* @__PURE__ */ B(!1), m = /* @__PURE__ */ B(n.textValue ?? ""), p = Xn(void 0, "reka-select-item-text"), g = "select.select";
    async function b(C) {
      if (C.defaultPrevented) return;
      const F = {
        originalEvent: C,
        value: n.value
      };
      sa(g, w, F);
    }
    async function w(C) {
      await Ue(), s("select", C), !C.defaultPrevented && (o.value || (r.onValueChange(n.value), r.multiple.value || r.onOpenChange(!1)));
    }
    async function x(C) {
      await Ue(), !C.defaultPrevented && (o.value ? i.onItemLeave?.() : C.currentTarget?.focus({ preventScroll: !0 }));
    }
    async function y(C) {
      await Ue(), !C.defaultPrevented && C.currentTarget === Ge() && i.onItemLeave?.();
    }
    async function v(C) {
      await Ue(), !(C.defaultPrevented || i.searchRef?.value !== "" && C.key === " ") && (fw.includes(C.key) && b(C), C.key === " " && C.preventDefault());
    }
    if (n.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    return Ke(() => {
      u.value && i.itemRefCallback(u.value, n.value, n.disabled);
    }), qw({
      value: n.value,
      disabled: o,
      textId: p,
      isSelected: c,
      onItemTextChange: (C) => {
        m.value = ((m.value || C?.textContent) ?? "").trim();
      }
    }), (C, F) => (h(), D(a(d), { value: { textValue: m.value } }, {
      default: E(() => [O(a(xe), {
        ref: a(l),
        role: "option",
        "aria-labelledby": a(p),
        "data-highlighted": f.value ? "" : void 0,
        "aria-selected": c.value,
        "data-state": c.value ? "checked" : "unchecked",
        "aria-disabled": a(o) || void 0,
        "data-disabled": a(o) ? "" : void 0,
        tabindex: a(o) ? void 0 : -1,
        as: e.as,
        "as-child": e.asChild,
        onFocus: F[0] || (F[0] = ($) => f.value = !0),
        onBlur: F[1] || (F[1] = ($) => f.value = !1),
        onPointerup: b,
        onPointerdown: F[2] || (F[2] = ($) => {
          $.currentTarget.focus({ preventScroll: !0 });
        }),
        onTouchend: F[3] || (F[3] = Gt(() => {
        }, ["prevent", "stop"])),
        onPointermove: x,
        onPointerleave: y,
        onKeydown: v
      }, {
        default: E(() => [G(C.$slots, "default", { selected: c.value })]),
        _: 3
      }, 8, [
        "aria-labelledby",
        "data-highlighted",
        "aria-selected",
        "data-state",
        "aria-disabled",
        "data-disabled",
        "tabindex",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["value"]));
  }
}), Rw = Iw, Dw = /* @__PURE__ */ V({
  __name: "SelectItemIndicator",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const { forwardRef: t } = fe(), n = op();
    return (s, o) => (h(), D(a(Cs), { present: e.forceMount || a(n).isSelected.value }, {
      default: E(() => [O(a(xe), {
        ref: a(t),
        "aria-hidden": "true",
        "data-state": a(n).isSelected.value ? "checked" : "unchecked",
        as: e.as,
        "as-child": e.asChild
      }, {
        default: E(() => [G(s.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), Fw = Dw, Bw = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = e, n = ts(), s = _i(), o = op(), { forwardRef: r, currentElement: i } = fe(), l = q(() => ({
      value: o.value,
      disabled: o.disabled.value,
      textContent: i.value?.textContent ?? o.value?.toString() ?? ""
    }));
    return Ke(() => {
      i.value && (o.onItemTextChange(i.value), s.itemTextRefCallback(i.value, o.value, o.disabled.value), n.onOptionAdd(l.value));
    }), hn(() => {
      n.onOptionRemove(l.value);
    }), (u, d) => (h(), D(a(xe), ue({
      id: a(o).textId,
      ref: a(r)
    }, {
      ...t,
      ...u.$attrs
    }), {
      default: E(() => [G(u.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Nw = Bw, Vw = /* @__PURE__ */ V({
  __name: "SelectPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, s) => (h(), D(a(gi), Nt(gn(t)), {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Lw = Vw, zw = /* @__PURE__ */ V({
  __name: "SelectTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = ts(), { forwardRef: s, currentElement: o } = fe(), r = q(() => n.disabled?.value || t.disabled);
    n.contentId ||= Xn(void 0, "reka-select-content"), Ke(() => {
      n.onTriggerChange(o.value);
    });
    const i = Nf(null), l = vh();
    function u() {
      return l.id ?? i?.fieldId.value;
    }
    function d() {
      const I = (L, se) => [L, se].filter(Boolean).join(" ") || void 0;
      return {
        ...i?.dataAttributes.value,
        id: u(),
        "aria-labelledby": I(l["aria-labelledby"], i?.labelId.value),
        "aria-describedby": I(l["aria-describedby"], i?.describedBy.value),
        "aria-invalid": l["aria-invalid"] ?? (i?.invalid.value || void 0)
      };
    }
    function c() {
      i?.handleControlFocus();
    }
    function f() {
      i?.handleControlBlur();
    }
    let m;
    Ke(() => {
      m = i?.registerControl({
        id: u,
        element: () => o.value,
        getValue: () => n.modelValue.value,
        required: () => !!n.required?.value
      });
    }), an(() => m?.());
    const { getItems: p } = Et(), { search: g, handleTypeaheadSearch: b, resetTypeahead: w } = fa();
    function x() {
      r.value || (n.onOpenChange(!0), w());
    }
    function y(I) {
      x(), n.triggerPointerDownPosRef.value = {
        x: Math.round(I.pageX),
        y: Math.round(I.pageY)
      };
    }
    function v(I) {
      return I.button === 0 && I.ctrlKey === !1;
    }
    let C = !1;
    function F(I) {
      if (I.defaultPrevented) return;
      if (I.pointerType === "touch") return I.preventDefault();
      const L = I.target;
      L.hasPointerCapture(I.pointerId) && L.releasePointerCapture(I.pointerId), v(I) && (y(I), C = !0);
    }
    function $(I) {
      I.defaultPrevented || v(I) && I.preventDefault();
    }
    function S(I) {
      if (I.defaultPrevented) {
        C = !1;
        return;
      }
      C || I.currentTarget?.focus(), C = !1;
    }
    function k(I) {
      I.defaultPrevented || (I.preventDefault(), I.pointerType === "touch" && y(I));
    }
    function M(I) {
      if (I.defaultPrevented) return;
      const L = g.value !== "";
      !(I.ctrlKey || I.altKey || I.metaKey) && I.key.length === 1 && b(I.key, p()), !(L && I.key === " ") && cw.includes(I.key) && (x(), I.preventDefault());
    }
    return (I, L) => (h(), D(a(ga), {
      "as-child": "",
      reference: e.reference
    }, {
      default: E(() => [O(a(xe), ue(d(), {
        ref: a(s),
        role: "combobox",
        type: e.as === "button" ? "button" : void 0,
        "aria-controls": a(n).open.value ? a(n).contentId : void 0,
        "aria-expanded": a(n).open.value || !1,
        "aria-required": a(n).required?.value,
        "aria-autocomplete": "none",
        disabled: r.value,
        dir: a(n)?.dir.value,
        "data-state": a(n)?.open.value ? "open" : "closed",
        "data-disabled": r.value ? "" : void 0,
        "data-placeholder": a(pw)(a(n).modelValue?.value) ? "" : void 0,
        "as-child": e.asChild,
        as: e.as,
        onClick: S,
        onPointerdown: F,
        onMousedown: $,
        onFocus: c,
        onBlur: f,
        onPointerup: k,
        onKeydown: M
      }), {
        default: E(() => [G(I.$slots, "default")]),
        _: 3
      }, 16, [
        "type",
        "aria-controls",
        "aria-expanded",
        "aria-required",
        "disabled",
        "dir",
        "data-state",
        "data-disabled",
        "data-placeholder",
        "as-child",
        "as"
      ])]),
      _: 3
    }, 8, ["reference"]));
  }
}), jw = zw, Kw = /* @__PURE__ */ V({
  __name: "SelectValue",
  props: {
    placeholder: {
      type: String,
      required: !1,
      default: ""
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: s } = fe(), o = ts();
    Ke(() => {
      o.valueElement = s;
    });
    const r = q(() => {
      let l = [];
      const u = Array.from(o.optionsSet.value), d = (c) => u.find((f) => Do(c, f.value, o.by));
      return Array.isArray(o.modelValue.value) ? l = o.modelValue.value.map((c) => d(c)?.textContent ?? "") : l = [d(o.modelValue.value)?.textContent ?? ""], l.filter(Boolean);
    }), i = q(() => r.value.length ? r.value.join(", ") : t.placeholder);
    return (l, u) => (h(), D(a(xe), {
      ref: a(n),
      as: e.as,
      "as-child": e.asChild,
      style: { pointerEvents: "none" },
      "data-placeholder": r.value.length ? void 0 : t.placeholder
    }, {
      default: E(() => [G(l.$slots, "default", {
        selectedLabel: r.value,
        modelValue: a(o).modelValue.value
      }, () => [Q(R(i.value), 1)])]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-placeholder"
    ]));
  }
}), Hw = Kw, Uw = /* @__PURE__ */ V({
  __name: "SelectViewport",
  props: {
    nonce: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, { nonce: n } = /* @__PURE__ */ it(t), s = Lb(n), o = _i(), r = o.position === "item-aligned" ? Cw() : void 0, { forwardRef: i, currentElement: l } = fe();
    Ke(() => {
      o?.onViewportChange(l.value);
    });
    const u = /* @__PURE__ */ B(0);
    function d(c) {
      const f = c.currentTarget, { shouldExpandOnScrollRef: m, contentWrapper: p } = r ?? {};
      if (m?.value && p?.value) {
        const g = Math.abs(u.value - f.scrollTop);
        if (g > 0) {
          const b = window.innerHeight - Kt * 2, w = Number.parseFloat(p.value.style.minHeight), x = Number.parseFloat(p.value.style.height), y = Math.max(w, x);
          if (y < b) {
            const v = y + g, C = Math.min(b, v), F = v - C;
            p.value.style.height = `${C}px`, p.value.style.bottom === "0px" && (f.scrollTop = F > 0 ? F : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      u.value = f.scrollTop;
    }
    return (c, f) => (h(), A(W, null, [O(a(xe), ue({
      ref: a(i),
      "data-reka-select-viewport": "",
      role: "presentation"
    }, {
      ...c.$attrs,
      ...t
    }, {
      style: {
        position: "relative",
        flex: 1,
        overflow: "hidden auto"
      },
      onScroll: d
    }), {
      default: E(() => [G(c.$slots, "default")]),
      _: 3
    }, 16), O(a(xe), {
      as: "style",
      nonce: a(s)
    }, {
      default: E(() => [...f[0] || (f[0] = [Q(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ", -1)])]),
      _: 1
    }, 8, ["nonce"])], 64));
  }
}), Ww = Uw;
const [Gw, Yw] = /* @__PURE__ */ Ye("SwitchRoot");
var Xw = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: null,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    id: {
      type: String,
      required: !1
    },
    value: {
      type: String,
      required: !1,
      default: "on"
    },
    trueValue: {
      type: null,
      required: !1,
      default: () => !0
    },
    falseValue: {
      type: null,
      required: !1,
      default: () => !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, { disabled: o } = /* @__PURE__ */ it(n), r = /* @__PURE__ */ Rt(n, "modelValue", s, {
      defaultValue: n.defaultValue ?? n.falseValue,
      passive: n.modelValue === void 0
    }), i = q(() => r.value === n.trueValue);
    function l() {
      o.value || (r.value = i.value ? n.falseValue : n.trueValue);
    }
    const { forwardRef: u, currentElement: d } = fe(), c = Gs(d), f = da(), m = q(() => n.id && d.value ? document.querySelector(`[for="${n.id}"]`)?.innerText : void 0);
    return Yw({
      checked: i,
      toggleCheck: l,
      disabled: o
    }), (p, g) => (h(), A(W, null, [O(a(xe), ue({
      id: e.id,
      ref: a(u),
      role: "switch",
      type: e.as === "button" ? "button" : void 0,
      value: e.value,
      "aria-label": p.$attrs["aria-label"] || m.value,
      "aria-checked": i.value,
      "aria-required": e.required,
      "data-state": i.value ? "checked" : "unchecked",
      "data-disabled": a(o) ? "" : void 0,
      "as-child": e.asChild,
      as: e.as,
      disabled: a(o)
    }, {
      ...a(f),
      ...p.$attrs
    }, {
      onClick: l,
      onKeydown: nf(Gt(l, ["prevent"]), ["enter"])
    }), {
      default: E(() => [G(p.$slots, "default", {
        modelValue: a(r),
        checked: i.value
      })]),
      _: 3
    }, 16, [
      "id",
      "type",
      "value",
      "aria-label",
      "aria-checked",
      "aria-required",
      "data-state",
      "data-disabled",
      "as-child",
      "as",
      "disabled",
      "onKeydown"
    ]), a(c) && e.name ? (h(), D(a(Uo), ue({
      key: 0,
      type: "checkbox",
      name: e.name,
      disabled: a(o),
      required: e.required,
      value: e.value,
      checked: i.value
    }, a(f)), null, 16, [
      "name",
      "disabled",
      "required",
      "value",
      "checked"
    ])) : Y("v-if", !0)], 64));
  }
}), Xu = Xw, Jw = /* @__PURE__ */ V({
  __name: "SwitchThumb",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = Gw();
    return fe(), (n, s) => (h(), D(a(xe), {
      "data-state": a(t).checked.value ? "checked" : "unchecked",
      "data-disabled": a(t).disabled.value ? "" : void 0,
      "as-child": e.asChild,
      as: e.as
    }, {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 8, [
      "data-state",
      "data-disabled",
      "as-child",
      "as"
    ]));
  }
}), Ju = Jw;
const Zw = /* @__PURE__ */ Symbol("ToastManagerSubscribe");
let el = 0;
function Qw() {
  return el = (el + 1) % Number.MAX_SAFE_INTEGER, `reka-toast-${el}`;
}
function Zu(e, t) {
  const n = typeof e == "function" ? e(t) : e;
  return typeof n == "string" ? { description: n } : n;
}
function e0(e, t, n, s) {
  const o = typeof t.loading == "string" ? { description: t.loading } : t.loading, r = n({
    ...o,
    status: "loading"
  });
  return e.then((i) => (s(r, {
    ...Zu(t.success, i),
    status: "success"
  }), i), (i) => {
    throw s(r, {
      ...Zu(t.error, i),
      status: "error"
    }), i;
  });
}
function t0() {
  const e = /* @__PURE__ */ mn([]), t = /* @__PURE__ */ Vt(/* @__PURE__ */ new Map());
  function n(u) {
    return e.value.find((d) => d.id === u);
  }
  function s(u, d) {
    e.value = e.value.map((c) => c.id === u ? d : c);
  }
  function o(u) {
    const d = n(u);
    !d || d.open || (e.value = e.value.filter((c) => c.id !== u), t.delete(u), d.onRemove?.());
  }
  function r(u) {
    const d = u.id ?? Qw(), c = n(d);
    if (c?.open) {
      const { id: m, ...p } = u;
      return s(d, {
        ...c,
        ...p,
        updateKey: c.updateKey + 1
      }), t.set(d, (t.get(d) ?? 0) + 1), d;
    }
    const f = c ? e.value.filter((m) => m.id !== d) : e.value;
    return e.value = [{
      ...u,
      id: d,
      open: !0,
      updateKey: 0
    }, ...f], d;
  }
  function i(u) {
    const d = e.value.filter((c) => c.open && (u === void 0 || c.id === u));
    d.length && (e.value = e.value.map((c) => d.includes(c) ? {
      ...c,
      open: !1
    } : c), d.forEach((c) => c.onClose?.()));
  }
  function l(u, d) {
    const c = n(u);
    if (!c?.open) return;
    const f = typeof d == "function" ? d(c) : d, m = n(u);
    m?.open && s(u, {
      ...m,
      ...f,
      id: u,
      open: !0,
      updateKey: m.updateKey + 1
    });
  }
  return {
    toasts: e,
    add: r,
    close: i,
    update: l,
    promise: (u, d) => e0(u, d, r, l),
    remove: o,
    getRestartKey: (u) => t.get(u) ?? 0
  };
}
const [Wo, n0] = /* @__PURE__ */ Ye("ToastProvider");
var s0 = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "ToastProvider",
  props: {
    label: {
      type: String,
      required: !1,
      default: "Notification"
    },
    duration: {
      type: Number,
      required: !1,
      default: 5e3
    },
    disableSwipe: {
      type: Boolean,
      required: !1
    },
    swipeDirection: {
      type: String,
      required: !1,
      default: "right"
    },
    swipeThreshold: {
      type: Number,
      required: !1,
      default: 50
    },
    limit: {
      type: Number,
      required: !1
    },
    toastManager: {
      type: Object,
      required: !1
    }
  },
  setup(e) {
    const t = e, { label: n, duration: s, disableSwipe: o, swipeDirection: r, swipeThreshold: i } = /* @__PURE__ */ it(t);
    Et({ isProvider: !0 });
    const l = /* @__PURE__ */ B(), u = /* @__PURE__ */ B(0), d = /* @__PURE__ */ B(!1), c = /* @__PURE__ */ B(!1), f = t0();
    Ke(() => {
      ve(() => t.toastManager, (x, y, v) => {
        if (!x) return;
        const C = x[Zw]((F) => {
          F.action === "add" ? f.add(F.options) : F.action === "close" ? f.close(F.id) : f.update(F.id, F.updates);
        });
        v(C);
      }, { immediate: !0 });
    });
    const m = /* @__PURE__ */ fc([]);
    let p = 0;
    const g = q(() => {
      const x = [...m].sort((F, $) => $.seq - F.seq), y = /* @__PURE__ */ new Map();
      let v = 0, C = 0;
      return x.forEach((F, $) => {
        const S = !F.open;
        y.set(F, {
          index: S ? $ : v,
          offsetY: C,
          limited: !S && t.limit !== void 0 && v >= t.limit
        }), S || (C += F.height, v++);
      }), {
        ordered: x,
        states: y
      };
    }), b = /* @__PURE__ */ B(!1), w = /* @__PURE__ */ B(!1);
    if (t.label && typeof t.label == "string" && !t.label.trim()) {
      const x = "Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.";
      throw new Error(x);
    }
    return n0({
      label: n,
      duration: s,
      disableSwipe: o,
      swipeDirection: r,
      swipeThreshold: i,
      toastCount: u,
      viewport: l,
      onViewportChange(x) {
        l.value = x;
      },
      onToastAdd() {
        u.value++;
      },
      onToastRemove() {
        u.value--;
      },
      isFocusedToastEscapeKeyDownRef: d,
      isClosePausedRef: c,
      toastStore: f,
      hovering: b,
      focused: w,
      expanded: q(() => b.value || w.value),
      frontmostHeight: q(() => g.value.ordered.find((x) => x.open)?.height || void 0),
      closingCount: q(() => m.filter((x) => !x.open).length),
      registerToast(x) {
        return x.seq = ++p, m.push(x), () => {
          const y = m.indexOf(x);
          y !== -1 && m.splice(y, 1);
        };
      },
      reopenToast(x) {
        x.seq = ++p;
      },
      getToastStack(x) {
        return g.value.states.get(x) ?? {
          index: 0,
          offsetY: 0,
          limited: !1
        };
      }
    }), (x, y) => G(x.$slots, "default");
  }
}), o0 = s0, r0 = /* @__PURE__ */ V({
  __name: "ToastAnnounce",
  setup(e) {
    const t = Wo(), n = nv(1e3), s = /* @__PURE__ */ B(!1);
    let o = 0, r = 0;
    return $t && (o = requestAnimationFrame(() => {
      r = requestAnimationFrame(() => {
        s.value = !0;
      });
    }), ni(() => {
      cancelAnimationFrame(o), cancelAnimationFrame(r);
    })), (i, l) => a(n) || s.value ? (h(), D(a(Ho), {
      key: 0,
      feature: "fully-hidden"
    }, {
      default: E(() => [Q(R(a(t).label.value) + " ", 1), G(i.$slots, "default")]),
      _: 3
    })) : Y("v-if", !0);
  }
}), i0 = r0;
const [l0] = /* @__PURE__ */ Ye("ToastPositioner"), a0 = "toast.swipeStart", u0 = "toast.swipeMove", d0 = "toast.swipeCancel", c0 = "toast.swipeEnd", Ol = "toast.viewportPause", Ml = "toast.viewportResume";
function ur(e, t, n) {
  const s = n.originalEvent.currentTarget, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && s.addEventListener(e, t, { once: !0 }), s.dispatchEvent(o);
}
function Qu(e, t, n = 0) {
  const s = Math.abs(e.x), o = Math.abs(e.y), r = s > o;
  return t === "left" || t === "right" ? r && s > n : !r && o > n;
}
function rp(e) {
  const t = [];
  return Array.from(e.childNodes).forEach((s) => {
    if (s.nodeType === s.TEXT_NODE && s.textContent && t.push(s.textContent), Hg(s)) {
      const o = s.ariaHidden || s.hidden || s.style.display === "none", r = s.dataset.rekaToastAnnounceExclude === "";
      if (!o) if (r) {
        const i = s.dataset.rekaToastAnnounceAlt;
        i && t.push(i);
      } else t.push(...rp(s));
    }
  }), t;
}
const [f0, p0] = /* @__PURE__ */ Ye("ToastRoot");
var m0 = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "ToastRootImpl",
  props: {
    type: {
      type: String,
      required: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: !1
    },
    duration: {
      type: Number,
      required: !1
    },
    toast: {
      type: Object,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "li"
    }
  },
  emits: [
    "close",
    "escapeKeyDown",
    "pause",
    "resume",
    "swipeStart",
    "swipeMove",
    "swipeCancel",
    "swipeEnd"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, { forwardRef: o, currentElement: r } = fe(), { CollectionItem: i } = Et(), l = Wo(), u = /* @__PURE__ */ B(null), d = /* @__PURE__ */ B(null), c = q(() => typeof n.duration == "number" ? n.duration : l.duration.value), f = /* @__PURE__ */ B(0), m = /* @__PURE__ */ B(c.value), p = /* @__PURE__ */ B(0), g = /* @__PURE__ */ B(c.value), b = iv(() => {
      const M = Date.now() - f.value;
      g.value = Math.max(m.value - M, 0);
    }, { fpsLimit: 60 });
    function w(M) {
      M <= 0 || M === Number.POSITIVE_INFINITY || $t && (window.clearTimeout(p.value), f.value = Date.now(), p.value = window.setTimeout(x, M));
    }
    function x(M) {
      const I = M?.pointerType === "";
      r.value?.contains(Ge()) && I && l.viewport.value?.focus(), I && (l.isClosePausedRef.value = !1), s("close");
    }
    const y = l0(null), v = /* @__PURE__ */ mn(null);
    ve([r, () => n.toast?.updateKey], ([M]) => {
      v.value = M ? rp(M) : null;
    }, {
      flush: "post",
      immediate: !0
    });
    const C = /* @__PURE__ */ Vt({
      seq: 0,
      height: 0,
      open: n.open
    }), F = q(() => l.getToastStack(C));
    function $() {
      const M = r.value;
      if (!M) return;
      const I = M.style.height;
      M.style.height = "auto", C.height = M.offsetHeight, M.style.height = I;
    }
    if (cf(r, $), ve(() => n.toast?.updateKey, $, { flush: "post" }), ve(() => n.open, (M, I) => {
      C.open = M, M && !I && l.reopenToast(C);
    }), n.type && !["foreground", "background"].includes(n.type)) {
      const M = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
      throw new Error(M);
    }
    kt((M) => {
      const I = l.viewport.value;
      if (I) {
        const L = () => {
          w(m.value), b.resume(), s("resume");
        }, se = () => {
          const ie = Date.now() - f.value;
          m.value = m.value - ie, window.clearTimeout(p.value), b.pause(), s("pause");
        };
        I.addEventListener(Ol, se), I.addEventListener(Ml, L), M(() => {
          I.removeEventListener(Ol, se), I.removeEventListener(Ml, L);
        });
      }
    });
    const S = q(() => n.toast ? l.toastStore.getRestartKey(n.toast.id) : 0);
    ve([
      () => n.open,
      c,
      S
    ], () => {
      m.value = c.value, n.open && !l.isClosePausedRef.value && w(c.value);
    }, { immediate: !0 }), la("Escape", (M) => {
      s("escapeKeyDown", M), M.defaultPrevented || (l.isFocusedToastEscapeKeyDownRef.value = !0, x());
    });
    let k;
    return Ke(() => {
      l.onToastAdd(), k = l.registerToast(C), $();
    }), hn(() => {
      l.onToastRemove(), k?.();
    }), p0({
      onClose: x,
      toast: /* @__PURE__ */ vc(n, "toast")
    }), (M, I) => (h(), A(W, null, [v.value ? (h(), D(i0, {
      key: e.toast?.updateKey ?? 0,
      role: "alert",
      "aria-live": e.type === "foreground" ? "assertive" : "polite"
    }, {
      default: E(() => [Y(`
      Render each chunk as its own text node so screen readers get the
      natural pause break between nodes (see comment in utils.ts).
      Interpolating the array directly with \`{{ announceTextContent }}\`
      would route through Vue's \`toDisplayString\`, which JSON-stringifies
      arrays — the live region would then announce literal \`[\`, quotes
      and commas instead of the toast title and description.
    `), (h(!0), A(W, null, pe(v.value, (L, se) => (h(), A(W, { key: se }, [Q(R(L), 1)], 64))), 128))]),
      _: 1
    }, 8, ["aria-live"])) : Y("v-if", !0), a(l).viewport.value || a(y) ? (h(), D(Yl, {
      key: 1,
      to: a(l).viewport.value ?? "body",
      disabled: !!a(y)
    }, [O(a(i), null, {
      default: E(() => [O(a(xe), ue({
        ref: a(o),
        tabindex: "0"
      }, M.$attrs, {
        as: e.as,
        "as-child": e.asChild,
        "data-state": e.open ? "open" : "closed",
        "data-swipe-direction": a(l).swipeDirection.value,
        "data-status": e.toast?.status,
        "data-expanded": a(l).expanded.value ? "" : void 0,
        "data-limited": F.value.limited ? "" : void 0,
        inert: F.value.limited || void 0,
        style: {
          ...a(l).disableSwipe.value ? void 0 : {
            userSelect: "none",
            touchAction: "none"
          },
          "--reka-toast-index": F.value.index,
          "--reka-toast-offset-y": `${F.value.offsetY}px`,
          "--reka-toast-height": C.height ? `${C.height}px` : void 0
        },
        onPointerdown: I[0] || (I[0] = Gt((L) => {
          a(l).disableSwipe.value || (u.value = {
            x: L.clientX,
            y: L.clientY
          });
        }, ["left"])),
        onPointermove: I[1] || (I[1] = (L) => {
          if (a(l).disableSwipe.value || !u.value) return;
          const se = L.clientX - u.value.x, ie = L.clientY - u.value.y, ge = !!d.value, H = ["left", "right"].includes(a(l).swipeDirection.value), J = ["left", "up"].includes(a(l).swipeDirection.value) ? Math.min : Math.max, ae = H ? J(0, se) : 0, $e = H ? 0 : J(0, ie), Me = L.pointerType === "touch" ? 10 : 2, ne = {
            x: ae,
            y: $e
          }, tt = {
            originalEvent: L,
            delta: ne
          };
          ge ? (d.value = ne, a(ur)(a(u0), (He) => s("swipeMove", He), tt)) : a(Qu)(ne, a(l).swipeDirection.value, Me) ? (d.value = ne, a(ur)(a(a0), (He) => s("swipeStart", He), tt), L.target.setPointerCapture(L.pointerId)) : (Math.abs(se) > Me || Math.abs(ie) > Me) && (u.value = null);
        }),
        onPointerup: I[2] || (I[2] = (L) => {
          if (a(l).disableSwipe.value) return;
          const se = d.value, ie = L.target;
          if (ie.hasPointerCapture(L.pointerId) && ie.releasePointerCapture(L.pointerId), d.value = null, u.value = null, se) {
            const ge = L.currentTarget, H = {
              originalEvent: L,
              delta: se
            };
            a(Qu)(se, a(l).swipeDirection.value, a(l).swipeThreshold.value) ? a(ur)(a(c0), (J) => s("swipeEnd", J), H) : a(ur)(a(d0), (J) => s("swipeCancel", J), H), ge?.addEventListener("click", (J) => J.preventDefault(), { once: !0 });
          }
        })
      }), {
        default: E(() => [G(M.$slots, "default", {
          remaining: g.value,
          duration: c.value
        })]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "data-state",
        "data-swipe-direction",
        "data-status",
        "data-expanded",
        "data-limited",
        "inert",
        "style"
      ])]),
      _: 3
    })], 8, ["to", "disabled"])) : Y("v-if", !0)], 64));
  }
}), h0 = m0, g0 = /* @__PURE__ */ V({
  __name: "ToastRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !0
    },
    forceMount: {
      type: Boolean,
      required: !1
    },
    type: {
      type: String,
      required: !1,
      default: "foreground"
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    duration: {
      type: Number,
      required: !1
    },
    toast: {
      type: Object,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "li"
    }
  },
  emits: [
    "escapeKeyDown",
    "pause",
    "resume",
    "swipeStart",
    "swipeMove",
    "swipeCancel",
    "swipeEnd",
    "update:open"
  ],
  setup(e, { emit: t }) {
    const n = e, s = t, { forwardRef: o } = fe(), r = /* @__PURE__ */ Rt(n, "open", s, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), i = Wo(), l = q(() => n.toast ? n.toast.open : r.value), u = q(() => n.toast?.type ?? n.type), d = q(() => n.toast?.status === "loading" ? Number.POSITIVE_INFINITY : n.toast?.duration ?? n.duration);
    function c() {
      n.toast ? (i.toastStore.close(n.toast.id), s("update:open", !1)) : r.value = !1;
    }
    const f = /* @__PURE__ */ B(!1);
    return ve([() => n.toast, f], ([m, p]) => {
      m && !m.open && !p && i.toastStore.remove(m.id);
    }, { immediate: !0 }), (m, p) => (h(), D(a(Cs), { present: e.forceMount || l.value }, {
      default: E(() => [O(h0, ue({
        ref: a(o),
        open: l.value,
        type: u.value,
        as: e.as,
        "as-child": e.asChild,
        duration: d.value,
        toast: e.toast
      }, m.$attrs, {
        onVnodeMounted: p[0] || (p[0] = (g) => f.value = !0),
        onVnodeUnmounted: p[1] || (p[1] = (g) => f.value = !1),
        onClose: c,
        onPause: p[2] || (p[2] = (g) => s("pause")),
        onResume: p[3] || (p[3] = (g) => s("resume")),
        onEscapeKeyDown: p[4] || (p[4] = (g) => s("escapeKeyDown", g)),
        onSwipeStart: p[5] || (p[5] = (g) => {
          s("swipeStart", g), g.defaultPrevented || g.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: p[6] || (p[6] = (g) => {
          if (s("swipeMove", g), !g.defaultPrevented) {
            const { x: b, y: w } = g.detail.delta, x = g.currentTarget;
            x.setAttribute("data-swipe", "move"), x.style.setProperty("--reka-toast-swipe-move-x", `${b}px`), x.style.setProperty("--reka-toast-swipe-move-y", `${w}px`);
          }
        }),
        onSwipeCancel: p[7] || (p[7] = (g) => {
          if (s("swipeCancel", g), !g.defaultPrevented) {
            const b = g.currentTarget;
            b.setAttribute("data-swipe", "cancel"), b.style.removeProperty("--reka-toast-swipe-move-x"), b.style.removeProperty("--reka-toast-swipe-move-y"), b.style.removeProperty("--reka-toast-swipe-end-x"), b.style.removeProperty("--reka-toast-swipe-end-y");
          }
        }),
        onSwipeEnd: p[8] || (p[8] = (g) => {
          if (s("swipeEnd", g), !g.defaultPrevented) {
            const { x: b, y: w } = g.detail.delta, x = g.currentTarget;
            x.setAttribute("data-swipe", "end"), x.style.removeProperty("--reka-toast-swipe-move-x"), x.style.removeProperty("--reka-toast-swipe-move-y"), x.style.setProperty("--reka-toast-swipe-end-x", `${b}px`), x.style.setProperty("--reka-toast-swipe-end-y", `${w}px`), c();
          }
        })
      }), {
        default: E(({ remaining: g, duration: b }) => [G(m.$slots, "default", {
          remaining: g,
          duration: b,
          open: l.value
        })]),
        _: 3
      }, 16, [
        "open",
        "type",
        "as",
        "as-child",
        "duration",
        "toast"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), v0 = g0, y0 = /* @__PURE__ */ V({
  __name: "ToastTitle",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    fe();
    const n = f0(null);
    return (s, o) => s.$slots.default || !a(n)?.toast.value || a(n).toast.value.title ? (h(), D(a(xe), Nt(ue({ key: 0 }, t)), {
      default: E(() => [G(s.$slots, "default", {}, () => [Q(R(a(n)?.toast.value?.title), 1)])]),
      _: 3
    }, 16)) : Y("v-if", !0);
  }
}), b0 = y0, x0 = /* @__PURE__ */ V({
  __name: "FocusProxy",
  emits: ["focusFromOutsideViewport"],
  setup(e, { emit: t }) {
    const n = t, s = Wo();
    return (o, r) => (h(), D(a(Ho), {
      tabindex: "0",
      style: { position: "fixed" },
      onFocus: r[0] || (r[0] = (i) => {
        const l = i.relatedTarget;
        !a(s).viewport.value?.contains(l) && n("focusFromOutsideViewport");
      })
    }, {
      default: E(() => [G(o.$slots, "default")]),
      _: 3
    }));
  }
}), ed = x0, w0 = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "ToastViewport",
  props: {
    hotkey: {
      type: Array,
      required: !1,
      default: () => ["F8"]
    },
    label: {
      type: [String, Function],
      required: !1,
      default: "Notifications ({hotkey})"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "ol"
    }
  },
  setup(e) {
    const t = e, { hotkey: n, label: s } = /* @__PURE__ */ it(t), { forwardRef: o, currentElement: r } = fe(), { CollectionSlot: i, getItems: l } = Et(), u = Wo(), d = q(() => u.toastCount.value > 0), c = /* @__PURE__ */ B(), f = /* @__PURE__ */ B(), m = /Key/g, p = /Digit/g, g = q(() => n.value.join("+").replace(m, "").replace(p, ""));
    la(n.value, () => {
      r.value.focus();
    }), Ke(() => {
      u.onViewportChange(r.value);
    });
    const b = /* @__PURE__ */ B(!1);
    ve([b, u.closingCount], ([x, y]) => {
      x && y === 0 && (u.hovering.value = !1, b.value = !1);
    }), ve(d, (x) => {
      x || (u.hovering.value = !1, u.focused.value = !1, b.value = !1);
    }), kt((x) => {
      const y = r.value;
      if (d.value && y) {
        const v = () => {
          if (!u.isClosePausedRef.value) {
            const I = new CustomEvent(Ol);
            y.dispatchEvent(I), u.isClosePausedRef.value = !0;
          }
        }, C = () => {
          if (u.isClosePausedRef.value) {
            const I = new CustomEvent(Ml);
            y.dispatchEvent(I), u.isClosePausedRef.value = !1;
          }
        }, F = (I) => {
          !y.contains(I.relatedTarget) && (u.focused.value = !1, C());
        }, $ = () => {
          b.value = !0, y.contains(Ge()) || C();
        }, S = () => {
          b.value = !1, u.hovering.value = !0;
        }, k = () => {
          u.focused.value = !0;
        }, M = (I) => {
          const L = I.altKey || I.ctrlKey || I.metaKey;
          if (I.key === "Tab" && !L) {
            const ie = Ge(), ge = I.shiftKey;
            if (I.target === y && ge) {
              c.value?.focus();
              return;
            }
            const ae = w({ tabbingDirection: ge ? "backwards" : "forwards" }), $e = ae.findIndex((Me) => Me === ie);
            br(ae.slice($e + 1)) ? I.preventDefault() : ge ? c.value?.focus() : f.value?.focus();
          }
        };
        y.addEventListener("focusin", v), y.addEventListener("focusin", k), y.addEventListener("focusout", F), y.addEventListener("pointermove", v), y.addEventListener("pointermove", S), y.addEventListener("pointerleave", $), y.addEventListener("keydown", M), window.addEventListener("blur", v), window.addEventListener("focus", C), x(() => {
          y.removeEventListener("focusin", v), y.removeEventListener("focusin", k), y.removeEventListener("focusout", F), y.removeEventListener("pointermove", v), y.removeEventListener("pointermove", S), y.removeEventListener("pointerleave", $), y.removeEventListener("keydown", M), window.removeEventListener("blur", v), window.removeEventListener("focus", C);
        });
      }
    });
    function w({ tabbingDirection: x }) {
      const v = l().map((C) => C.ref).map((C) => {
        const F = [C, ...pa(C)];
        return x === "forwards" ? F : F.reverse();
      });
      return (x === "forwards" ? v.reverse() : v).flat();
    }
    return (x, y) => (h(), D(a(Yv), {
      role: "region",
      "aria-label": typeof a(s) == "string" ? a(s).replace("{hotkey}", g.value) : a(s)(g.value),
      tabindex: "-1",
      style: Ie({ pointerEvents: d.value ? void 0 : "none" })
    }, {
      default: E(() => [
        d.value ? (h(), D(ed, {
          key: 0,
          ref: (v) => {
            v && (c.value = a(It)(v));
          },
          onFocusFromOutsideViewport: y[0] || (y[0] = () => {
            const v = w({ tabbingDirection: "forwards" });
            a(br)(v);
          })
        }, null, 512)) : Y("v-if", !0),
        O(a(i), null, {
          default: E(() => [O(a(xe), ue({
            ref: a(o),
            tabindex: "-1",
            as: e.as,
            "as-child": e.asChild,
            "data-expanded": a(u).expanded.value ? "" : void 0,
            style: { "--reka-toast-frontmost-height": a(u).frontmostHeight.value ? `${a(u).frontmostHeight.value}px` : void 0 }
          }, x.$attrs), {
            default: E(() => [G(x.$slots, "default")]),
            _: 3
          }, 16, [
            "as",
            "as-child",
            "data-expanded",
            "style"
          ])]),
          _: 3
        }),
        d.value ? (h(), D(ed, {
          key: 1,
          ref: (v) => {
            v && (f.value = a(It)(v));
          },
          onFocusFromOutsideViewport: y[1] || (y[1] = () => {
            const v = w({ tabbingDirection: "backwards" });
            a(br)(v);
          })
        }, null, 512)) : Y("v-if", !0)
      ]),
      _: 3
    }, 8, ["aria-label", "style"]));
  }
}), k0 = w0;
const [ip, _0] = /* @__PURE__ */ Ye("ToggleGroupRoot");
var C0 = /* @__PURE__ */ V({
  __name: "ToggleGroupRoot",
  props: {
    rovingFocus: {
      type: Boolean,
      required: !1,
      default: !0
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: !1
    },
    orientation: {
      type: String,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    },
    type: {
      type: String,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, { loop: o, rovingFocus: r, disabled: i, dir: l } = /* @__PURE__ */ it(n), u = _s(l), { forwardRef: d, currentElement: c } = fe(), { modelValue: f, changeModelValue: m, isSingle: p } = Dv(n, s), g = Gs(c);
    return _0({
      isSingle: p,
      modelValue: f,
      changeModelValue: m,
      dir: u,
      orientation: n.orientation,
      loop: o,
      rovingFocus: r,
      disabled: i
    }), (b, w) => (h(), D(ws(a(r) ? a(Bf) : a(xe)), {
      "as-child": "",
      orientation: a(r) ? e.orientation : void 0,
      dir: a(u),
      loop: a(r) ? a(o) : void 0
    }, {
      default: E(() => [O(a(xe), {
        ref: a(d),
        role: "group",
        "as-child": e.asChild,
        as: e.as
      }, {
        default: E(() => [G(b.$slots, "default", { modelValue: a(f) }), a(g) && e.name ? (h(), D(Uo, {
          key: 0,
          name: e.name,
          required: e.required,
          value: a(f)
        }, null, 8, [
          "name",
          "required",
          "value"
        ])) : Y("v-if", !0)]),
        _: 3
      }, 8, ["as-child", "as"])]),
      _: 3
    }, 8, [
      "orientation",
      "dir",
      "loop"
    ]));
  }
}), S0 = C0, $0 = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "Toggle",
  props: {
    defaultValue: {
      type: Boolean,
      required: !1
    },
    modelValue: {
      type: [Boolean, null],
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, { forwardRef: o, currentElement: r } = fe(), i = da(), l = ip(null), u = /* @__PURE__ */ Rt(n, "modelValue", s, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    });
    function d() {
      u.value = !u.value;
    }
    const c = q(() => u.value ? "on" : "off"), f = Gs(r);
    return (m, p) => (h(), A(W, null, [O(a(xe), ue({
      ref: a(o),
      type: e.as === "button" ? "button" : void 0,
      "as-child": n.asChild,
      as: e.as,
      "aria-pressed": a(u),
      "data-state": c.value,
      "data-disabled": e.disabled ? "" : void 0,
      disabled: e.disabled
    }, {
      ...a(i),
      ...m.$attrs
    }, { onClick: d }), {
      default: E(() => [G(m.$slots, "default", {
        modelValue: a(u),
        disabled: e.disabled,
        pressed: a(u),
        state: c.value
      })]),
      _: 3
    }, 16, [
      "type",
      "as-child",
      "as",
      "aria-pressed",
      "data-state",
      "data-disabled",
      "disabled"
    ]), a(f) && e.name && !a(l) ? (h(), D(Uo, ue({
      key: 0,
      type: "checkbox",
      name: e.name,
      value: a(u),
      required: e.required
    }, a(i)), null, 16, [
      "name",
      "value",
      "required"
    ])) : Y("v-if", !0)], 64));
  }
}), E0 = $0, T0 = /* @__PURE__ */ V({
  __name: "ToggleGroupItem",
  props: {
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = ip(), s = q(() => n.disabled?.value || t.disabled), o = q(() => lf(n.modelValue.value, t.value)), { forwardRef: r } = fe(), i = da();
    return (l, u) => (h(), D(ws(a(n).rovingFocus.value ? a(Ub) : a(xe)), ue({ "as-child": "" }, a(n).rovingFocus.value ? {
      focusable: !s.value,
      active: o.value
    } : {}), {
      default: E(() => [O(a(E0), ue({
        ...a(i),
        ...t
      }, {
        ref: a(r),
        disabled: s.value,
        "model-value": o.value,
        "onUpdate:modelValue": u[0] || (u[0] = (d) => a(n).changeModelValue(e.value))
      }), {
        default: E((d) => [G(l.$slots, "default", Nt(gn(d)))]),
        _: 3
      }, 16, ["disabled", "model-value"])]),
      _: 3
    }, 16));
  }
}), A0 = T0;
const [Ci, P0] = /* @__PURE__ */ Ye("TooltipProvider");
var O0 = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "TooltipProvider",
  props: {
    delayDuration: {
      type: Number,
      required: !1,
      default: 700
    },
    skipDelayDuration: {
      type: Number,
      required: !1,
      default: 300
    },
    disableHoverableContent: {
      type: Boolean,
      required: !1,
      default: !1
    },
    disableClosingTrigger: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      required: !1,
      default: !1
    },
    content: {
      type: Object,
      required: !1
    }
  },
  setup(e) {
    const t = e, { delayDuration: n, skipDelayDuration: s, disableHoverableContent: o, disableClosingTrigger: r, ignoreNonKeyboardFocus: i, disabled: l, content: u } = /* @__PURE__ */ it(t);
    fe();
    const d = /* @__PURE__ */ B(!0), c = /* @__PURE__ */ B(!1), { start: f, stop: m } = ra(() => {
      d.value = !0;
    }, s, { immediate: !1 });
    return P0({
      isOpenDelayed: d,
      delayDuration: n,
      onOpen() {
        m(), d.value = !1;
      },
      onClose() {
        f();
      },
      isPointerInTransitRef: c,
      disableHoverableContent: o,
      disableClosingTrigger: r,
      disabled: l,
      ignoreNonKeyboardFocus: i,
      content: u
    }), (p, g) => G(p.$slots, "default");
  }
}), M0 = O0;
const lp = "tooltip.open", [Si, q0] = /* @__PURE__ */ Ye("TooltipRoot");
var I0 = /* @__PURE__ */ V({
  __name: "TooltipRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    delayDuration: {
      type: Number,
      required: !1,
      default: void 0
    },
    disableHoverableContent: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disableClosingTrigger: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      required: !1,
      default: void 0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    fe();
    const o = Ci(), r = q(() => n.disableHoverableContent ?? o.disableHoverableContent.value), i = q(() => n.disableClosingTrigger ?? o.disableClosingTrigger.value), l = q(() => n.disabled ?? o.disabled.value), u = q(() => n.delayDuration ?? o.delayDuration.value), d = q(() => n.ignoreNonKeyboardFocus ?? o.ignoreNonKeyboardFocus.value), c = /* @__PURE__ */ Rt(n, "open", s, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    });
    ve(c, (v) => {
      o.onClose && (v ? (o.onOpen(), document.dispatchEvent(new CustomEvent(lp))) : o.onClose());
    });
    const f = /* @__PURE__ */ B(!1), m = /* @__PURE__ */ B(), p = q(() => c.value ? f.value ? "delayed-open" : "instant-open" : "closed"), { start: g, stop: b } = ra(() => {
      f.value = !0, c.value = !0;
    }, u, { immediate: !1 });
    function w() {
      b(), f.value = !1, c.value = !0;
    }
    function x() {
      b(), c.value = !1;
    }
    function y() {
      g();
    }
    return q0({
      contentId: "",
      open: c,
      stateAttribute: p,
      trigger: m,
      onTriggerChange(v) {
        m.value = v;
      },
      onTriggerEnter() {
        o.isOpenDelayed.value ? y() : w();
      },
      onTriggerLeave() {
        r.value ? x() : b();
      },
      onOpen: w,
      onClose: x,
      disableHoverableContent: r,
      disableClosingTrigger: i,
      disabled: l,
      ignoreNonKeyboardFocus: d
    }), (v, C) => (h(), D(a(ha), null, {
      default: E(() => [G(v.$slots, "default", { open: a(c) })]),
      _: 3
    }));
  }
}), R0 = I0, D0 = /* @__PURE__ */ V({
  __name: "TooltipContentImpl",
  props: {
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Si(), r = Ci(), { forwardRef: i, currentElement: l } = fe(), u = q(() => n.ariaLabel || l.value?.textContent), d = q(() => {
      const { ariaLabel: c, ...f } = n;
      return hf(f, r.content.value ?? {}, {
        side: "top",
        sideOffset: 0,
        align: "center",
        avoidCollisions: !0,
        collisionBoundary: [],
        collisionPadding: 0,
        arrowPadding: 0,
        sticky: "partial",
        hideWhenDetached: !1
      });
    });
    return Ke(() => {
      Ft(window, "scroll", (c) => {
        c.target?.contains(o.trigger.value) && o.onClose();
      }, { capture: !0 }), Ft(document, lp, o.onClose);
    }), (c, f) => (h(), D(a(hi), {
      "as-child": "",
      "disable-outside-pointer-events": !1,
      onEscapeKeyDown: f[0] || (f[0] = (m) => s("escapeKeyDown", m)),
      onPointerDownOutside: f[1] || (f[1] = (m) => {
        a(o).disableClosingTrigger.value && a(o).trigger.value?.contains(m.target) && m.preventDefault(), s("pointerDownOutside", m);
      }),
      onFocusOutside: f[2] || (f[2] = Gt(() => {
      }, ["prevent"])),
      onDismiss: f[3] || (f[3] = (m) => a(o).onClose())
    }, {
      default: E(() => [O(a(Ca), ue({
        ref: a(i),
        "data-state": a(o).stateAttribute.value
      }, {
        ...c.$attrs,
        ...d.value
      }, { style: {
        "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
        "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
        "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: E(() => [G(c.$slots, "default"), O(a(Ho), {
          id: a(o).contentId,
          role: "tooltip"
        }, {
          default: E(() => [Q(R(u.value), 1)]),
          _: 1
        }, 8, ["id"])]),
        _: 3
      }, 16, ["data-state"])]),
      _: 3
    }));
  }
}), ap = D0, F0 = /* @__PURE__ */ V({
  __name: "TooltipContentHoverable",
  props: {
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const n = Ys(e), { forwardRef: s, currentElement: o } = fe(), { trigger: r, onClose: i } = Si(), l = Ci(), { isPointerInTransit: u, onPointerExit: d } = gv(r, o);
    return l.isPointerInTransitRef = u, d(() => {
      i();
    }), Ft(o, "pointermove", (c) => {
      const f = o.value;
      if (!f || c.pointerType === "touch") return;
      f.ownerDocument.elementsFromPoint?.(c.clientX, c.clientY).some((p) => {
        if (f.contains(p)) return !1;
        const g = p.closest("[data-grace-area-trigger]");
        return !!g && g !== r.value;
      }) && i();
    }), (c, f) => (h(), D(ap, ue({ ref: a(s) }, a(n)), {
      default: E(() => [G(c.$slots, "default")]),
      _: 3
    }, 16));
  }
}), B0 = F0, N0 = /* @__PURE__ */ V({
  __name: "TooltipContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, s = t, o = Si(), r = Xs(n, s), { forwardRef: i } = fe();
    return (l, u) => (h(), D(a(Cs), { present: e.forceMount || a(o).open.value }, {
      default: E(() => [(h(), D(ws(a(o).disableHoverableContent.value ? ap : B0), ue({ ref: a(i) }, a(r)), {
        default: E(() => [G(l.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), V0 = N0, L0 = /* @__PURE__ */ V({
  __name: "TooltipPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, s) => (h(), D(a(gi), Nt(gn(t)), {
      default: E(() => [G(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), z0 = L0, j0 = /* @__PURE__ */ V({
  __name: "TooltipTrigger",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = Si(), s = Ci();
    n.contentId ||= Xn(void 0, "reka-tooltip-content");
    const { forwardRef: o, currentElement: r } = fe(), i = /* @__PURE__ */ B(!1), l = /* @__PURE__ */ B(!1), u = q(() => n.disabled.value ? {} : {
      click: b,
      focus: p,
      pointermove: f,
      pointerleave: m,
      pointerdown: c,
      blur: g
    });
    ve(r, (w) => {
      n.onTriggerChange(w);
    }, { immediate: !0 });
    function d() {
      setTimeout(() => {
        i.value = !1;
      }, 1);
    }
    function c() {
      n.open && !n.disableClosingTrigger.value && n.onClose(), i.value = !0, document.addEventListener("pointerup", d, { once: !0 });
    }
    function f(w) {
      w.pointerType !== "touch" && !l.value && !s.isPointerInTransitRef.value && (n.onTriggerEnter(), l.value = !0);
    }
    function m() {
      n.onTriggerLeave(), l.value = !1;
    }
    function p(w) {
      i.value || n.ignoreNonKeyboardFocus.value && !w.target.matches?.(":focus-visible") || n.onOpen();
    }
    function g() {
      n.onClose();
    }
    function b() {
      n.disableClosingTrigger.value || n.onClose();
    }
    return (w, x) => (h(), D(a(ga), {
      "as-child": "",
      reference: e.reference ?? a(r)
    }, {
      default: E(() => [O(a(xe), ue({
        ref: a(o),
        "aria-describedby": a(n).open.value ? a(n).contentId : void 0,
        "data-state": a(n).stateAttribute.value,
        as: e.as,
        "as-child": t.asChild,
        "data-grace-area-trigger": ""
      }, hh(u.value)), {
        default: E(() => [G(w.$slots, "default")]),
        _: 3
      }, 16, [
        "aria-describedby",
        "data-state",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["reference"]));
  }
}), td = j0;
function up(e) {
  var t, n, s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = up(e[t])) && (s && (s += " "), s += n);
  } else for (n in e) e[n] && (s && (s += " "), s += n);
  return s;
}
function dp() {
  for (var e, t, n = 0, s = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = up(e)) && (s && (s += " "), s += t);
  return s;
}
const K0 = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let s = 0; s < e.length; s++)
    n[s] = e[s];
  for (let s = 0; s < t.length; s++)
    n[e.length + s] = t[s];
  return n;
}, H0 = (e, t) => ({
  classGroupId: e,
  validator: t
}), cp = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
}), Br = "-", nd = [], U0 = "arbitrary..", W0 = (e) => {
  const t = Y0(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return G0(i);
      const l = i.split(Br), u = l[0] === "" && l.length > 1 ? 1 : 0;
      return fp(l, u, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const u = s[i], d = n[i];
        return u ? d ? K0(d, u) : u : d || nd;
      }
      return n[i] || nd;
    }
  };
}, fp = (e, t, n) => {
  if (e.length - t === 0)
    return n.classGroupId;
  const o = e[t], r = n.nextPart.get(o);
  if (r) {
    const d = fp(e, t + 1, r);
    if (d) return d;
  }
  const i = n.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(Br) : e.slice(t).join(Br), u = i.length;
  for (let d = 0; d < u; d++) {
    const c = i[d];
    if (c.validator(l))
      return c.classGroupId;
  }
}, G0 = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), n = t.indexOf(":"), s = t.slice(0, n);
  return s ? U0 + s : void 0;
})(), Y0 = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return X0(n, t);
}, X0 = (e, t) => {
  const n = cp();
  for (const s in e) {
    const o = e[s];
    Ta(o, n, s, t);
  }
  return n;
}, Ta = (e, t, n, s) => {
  const o = e.length;
  for (let r = 0; r < o; r++) {
    const i = e[r];
    J0(i, t, n, s);
  }
}, J0 = (e, t, n, s) => {
  if (typeof e == "string") {
    Z0(e, t, n);
    return;
  }
  if (typeof e == "function") {
    Q0(e, t, n, s);
    return;
  }
  e1(e, t, n, s);
}, Z0 = (e, t, n) => {
  const s = e === "" ? t : pp(t, e);
  s.classGroupId = n;
}, Q0 = (e, t, n, s) => {
  if (t1(e)) {
    Ta(e(s), t, n, s);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(H0(n, e));
}, e1 = (e, t, n, s) => {
  const o = Object.entries(e), r = o.length;
  for (let i = 0; i < r; i++) {
    const [l, u] = o[i];
    Ta(u, pp(t, l), n, s);
  }
}, pp = (e, t) => {
  let n = e;
  const s = t.split(Br), o = s.length;
  for (let r = 0; r < o; r++) {
    const i = s[r];
    let l = n.nextPart.get(i);
    l || (l = cp(), n.nextPart.set(i, l)), n = l;
  }
  return n;
}, t1 = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, n1 = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const o = (r, i) => {
    n[r] = i, t++, t > e && (t = 0, s = n, n = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(r) {
      let i = n[r];
      if (i !== void 0)
        return i;
      if ((i = s[r]) !== void 0)
        return o(r, i), i;
    },
    set(r, i) {
      r in n ? n[r] = i : o(r, i);
    }
  };
}, ql = "!", sd = ":", s1 = [], od = (e, t, n, s, o) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: s,
  isExternal: o
}), o1 = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let s = (o) => {
    const r = [];
    let i = 0, l = 0, u = 0, d;
    const c = o.length;
    for (let b = 0; b < c; b++) {
      const w = o[b];
      if (i === 0 && l === 0) {
        if (w === sd) {
          r.push(o.slice(u, b)), u = b + 1;
          continue;
        }
        if (w === "/") {
          d = b;
          continue;
        }
      }
      w === "[" ? i++ : w === "]" ? i-- : w === "(" ? l++ : w === ")" && l--;
    }
    const f = r.length === 0 ? o : o.slice(u);
    let m = f, p = !1;
    f.endsWith(ql) ? (m = f.slice(0, -1), p = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(ql) && (m = f.slice(1), p = !0)
    );
    const g = d && d > u ? d - u : void 0;
    return od(r, p, m, g);
  };
  if (t) {
    const o = t + sd, r = s;
    s = (i) => i.startsWith(o) ? r(i.slice(o.length)) : od(s1, !1, i, void 0, !0);
  }
  if (n) {
    const o = s;
    s = (r) => n({
      className: r,
      parseClassName: o
    });
  }
  return s;
}, r1 = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, s) => {
    t.set(n, 1e6 + s);
  }), (n) => {
    const s = [];
    let o = [];
    for (let r = 0; r < n.length; r++) {
      const i = n[r], l = i[0] === "[", u = t.has(i);
      l || u ? (o.length > 0 && (o.sort(), s.push(...o), o = []), s.push(i)) : o.push(i);
    }
    return o.length > 0 && (o.sort(), s.push(...o)), s;
  };
}, i1 = (e) => ({
  cache: n1(e.cacheSize),
  parseClassName: o1(e),
  sortModifiers: r1(e),
  postfixLookupClassGroupIds: l1(e),
  ...W0(e)
}), l1 = (e) => {
  const t = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let s = 0; s < n.length; s++)
      t[n[s]] = !0;
  return t;
}, a1 = /\s+/, u1 = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: s,
    getConflictingClassGroupIds: o,
    sortModifiers: r,
    postfixLookupClassGroupIds: i
  } = t, l = [], u = e.trim().split(a1);
  let d = "";
  for (let c = u.length - 1; c >= 0; c -= 1) {
    const f = u[c], {
      isExternal: m,
      modifiers: p,
      hasImportantModifier: g,
      baseClassName: b,
      maybePostfixModifierPosition: w
    } = n(f);
    if (m) {
      d = f + (d.length > 0 ? " " + d : d);
      continue;
    }
    let x = !!w, y;
    if (x) {
      const S = b.substring(0, w);
      y = s(S);
      const k = y && i[y] ? s(b) : void 0;
      k && k !== y && (y = k, x = !1);
    } else
      y = s(b);
    if (!y) {
      if (!x) {
        d = f + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (y = s(b), !y) {
        d = f + (d.length > 0 ? " " + d : d);
        continue;
      }
      x = !1;
    }
    const v = p.length === 0 ? "" : p.length === 1 ? p[0] : r(p).join(":"), C = g ? v + ql : v, F = C + y;
    if (l.indexOf(F) > -1)
      continue;
    l.push(F);
    const $ = o(y, x);
    for (let S = 0; S < $.length; ++S) {
      const k = $[S];
      l.push(C + k);
    }
    d = f + (d.length > 0 ? " " + d : d);
  }
  return d;
}, d1 = (...e) => {
  let t = 0, n, s, o = "";
  for (; t < e.length; )
    (n = e[t++]) && (s = mp(n)) && (o && (o += " "), o += s);
  return o;
}, mp = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (t = mp(e[s])) && (n && (n += " "), n += t);
  return n;
}, rd = (e, ...t) => {
  let n, s, o, r;
  const i = (u) => {
    const d = t.reduce((c, f) => f(c), e());
    return n = i1(d), s = n.cache.get, o = n.cache.set, r = l, l(u);
  }, l = (u) => {
    const d = s(u);
    if (d)
      return d;
    const c = u1(u, n);
    return o(u, c), c;
  };
  return r = i, (...u) => r(d1(...u));
}, c1 = [], ut = (e) => {
  const t = (n) => n[e] || c1;
  return t.isThemeGetter = !0, t.themeKey = e, t;
}, hp = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, gp = /^\((?:(\w[\w-]*):)?(.+)\)$/i, f1 = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, p1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, m1 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, h1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, g1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, v1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Rn = (e) => f1.test(e), Ce = (e) => !!e && !Number.isNaN(Number(e)), Qt = (e) => !!e && Number.isInteger(Number(e)), tl = (e) => e.endsWith("%") && Ce(e.slice(0, -1)), yn = (e) => p1.test(e), vp = () => !0, y1 = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  m1.test(e) && !h1.test(e)
), Aa = () => !1, b1 = (e) => g1.test(e), x1 = (e) => v1.test(e), w1 = (e) => !oe(e) && !re(e), k1 = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), _1 = (e) => ns(e, xp, Aa), oe = (e) => hp.test(e), is = (e) => ns(e, wp, y1), id = (e) => ns(e, O1, Ce), C1 = (e) => ns(e, _p, vp), S1 = (e) => ns(e, kp, Aa), ld = (e) => ns(e, yp, Aa), $1 = (e) => ns(e, bp, x1), dr = (e) => ns(e, Cp, b1), re = (e) => gp.test(e), lo = (e) => $s(e, wp), E1 = (e) => $s(e, kp), ad = (e) => $s(e, yp), T1 = (e) => $s(e, xp), A1 = (e) => $s(e, bp), cr = (e) => $s(e, Cp, !0), P1 = (e) => $s(e, _p, !0), ns = (e, t, n) => {
  const s = hp.exec(e);
  return s ? s[1] ? t(s[1]) : n(s[2]) : !1;
}, $s = (e, t, n = !1) => {
  const s = gp.exec(e);
  return s ? s[1] ? t(s[1]) : n : !1;
}, yp = (e) => e === "position" || e === "percentage", bp = (e) => e === "image" || e === "url", xp = (e) => e === "length" || e === "size" || e === "bg-size", wp = (e) => e === "length", O1 = (e) => e === "number", kp = (e) => e === "family-name", _p = (e) => e === "number" || e === "weight", Cp = (e) => e === "shadow", ud = () => {
  const e = ut("color"), t = ut("font"), n = ut("text"), s = ut("font-weight"), o = ut("tracking"), r = ut("leading"), i = ut("breakpoint"), l = ut("container"), u = ut("spacing"), d = ut("radius"), c = ut("shadow"), f = ut("inset-shadow"), m = ut("text-shadow"), p = ut("drop-shadow"), g = ut("blur"), b = ut("perspective"), w = ut("aspect"), x = ut("ease"), y = ut("animate"), v = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], F = () => [...C(), re, oe], $ = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], k = () => [re, oe, u], M = () => [Rn, "full", "auto", ...k()], I = () => [Qt, "none", "subgrid", re, oe], L = () => ["auto", {
    span: ["full", Qt, re, oe]
  }, Qt, re, oe], se = () => [Qt, "auto", re, oe], ie = () => ["auto", "min", "max", "fr", re, oe], ge = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], J = () => ["auto", ...k()], ae = () => [Rn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], $e = () => [l, Rn, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...k()], Me = () => [Rn, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...k()], ne = () => [e, re, oe], tt = () => [...C(), ad, ld, {
    position: [re, oe]
  }], He = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], we = () => ["auto", "cover", "contain", T1, _1, {
    size: [re, oe]
  }], Pe = () => [tl, lo, is], Fe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    re,
    oe
  ], Oe = () => ["", Ce, lo, is], Xe = () => ["solid", "dashed", "dotted", "double"], at = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ke = () => [Ce, tl, ad, ld], _t = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    re,
    oe
  ], _ = () => ["none", Ce, re, oe], P = () => ["none", Ce, re, oe], N = () => [Ce, re, oe], U = () => [Rn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [yn],
      breakpoint: [yn],
      color: [vp],
      container: [yn],
      "drop-shadow": [yn],
      ease: ["in", "out", "in-out"],
      font: [w1],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [yn],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [yn],
      shadow: [yn],
      spacing: ["px", Ce],
      text: [yn],
      "text-shadow": [yn],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Rn, oe, re, w]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", re, oe]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [k1],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Ce, "auto", oe, re, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": v()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": v()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: F()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: $()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": $()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": $()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: M()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": M()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": M()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": M(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: M()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": M(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: M()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": M()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": M()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: M()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: M()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: M()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: M()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Qt, "auto", re, oe]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Rn, "full", "auto", l, ...k()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Ce, Rn, "auto", "initial", "none", oe]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Ce, re, oe]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Ce, re, oe]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Qt, "first", "last", "none", re, oe]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": I()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: L()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": se()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": se()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": I()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: L()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": se()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": se()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ie()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ie()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: k()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": k()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": k()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ge(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...H(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...H()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ge()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ge()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...H(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...H()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: k()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: k()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: k()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: k()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: k()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: k()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: k()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: k()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: k()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: k()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: k()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: J()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: J()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: J()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: J()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: J()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: J()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: J()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: J()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: J()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: J()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: J()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": k()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": k()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: ae()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...$e()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...$e()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...$e()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...Me()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...Me()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...Me()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...ae()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...ae()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...ae()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...ae()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...ae()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...ae()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, lo, is]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [s, P1, C1]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", tl, oe]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [E1, S1, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [oe]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, re, oe]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Ce, "none", re, id]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          r,
          ...k()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", re, oe]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", re, oe]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: ne()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: ne()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...Xe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Ce, "from-font", "auto", re, is]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: ne()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Ce, "auto", re, oe]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: k()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [Qt, re, oe]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", re, oe]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", re, oe]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: tt()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: He()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: we()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Qt, re, oe],
          radial: ["", re, oe],
          conic: ["", Qt, re, oe]
        }, A1, $1]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: ne()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Pe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Pe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Pe()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: ne()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: ne()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: ne()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Fe()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Fe()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Fe()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Fe()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Fe()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Fe()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Fe()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Fe()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Fe()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Fe()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Fe()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Fe()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Fe()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Fe()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Fe()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Oe()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Oe()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Oe()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Oe()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Oe()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": Oe()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": Oe()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Oe()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Oe()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Oe()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Oe()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Oe()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": Oe()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...Xe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...Xe(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: ne()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": ne()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": ne()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": ne()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": ne()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": ne()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": ne()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": ne()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": ne()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": ne()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": ne()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: ne()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...Xe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Ce, re, oe]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Ce, lo, is]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: ne()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          c,
          cr,
          dr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: ne()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, cr, dr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": ne()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Oe()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: ne()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Ce, is]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": ne()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Oe()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": ne()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, cr, dr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": ne()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Ce, re, oe]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...at(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": at()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Ce]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ke()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ke()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": ne()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": ne()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ke()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ke()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": ne()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": ne()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ke()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ke()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": ne()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": ne()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ke()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ke()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": ne()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": ne()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ke()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ke()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": ne()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": ne()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ke()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ke()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": ne()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": ne()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ke()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ke()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": ne()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": ne()
      }],
      "mask-image-radial": [{
        "mask-radial": [re, oe]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": ke()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ke()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": ne()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": ne()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Ce]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ke()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ke()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": ne()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": ne()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: tt()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: He()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: we()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", re, oe]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          re,
          oe
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: _t()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Ce, re, oe]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Ce, re, oe]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          p,
          cr,
          dr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": ne()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Ce, re, oe]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Ce, re, oe]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Ce, re, oe]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Ce, re, oe]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Ce, re, oe]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          re,
          oe
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": _t()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Ce, re, oe]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Ce, re, oe]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Ce, re, oe]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Ce, re, oe]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Ce, re, oe]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Ce, re, oe]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Ce, re, oe]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Ce, re, oe]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": k()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": k()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": k()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", re, oe]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Ce, "initial", re, oe]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", x, re, oe]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Ce, re, oe]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", y, re, oe]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [b, re, oe]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": F()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: _()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": _()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": _()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": _()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: P()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": P()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": P()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": P()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: N()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": N()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": N()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [re, oe, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: F()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: U()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": U()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": U()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": U()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [Qt, re, oe]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ne()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: ne()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", re, oe]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": ne()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": ne()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": k()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": k()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": k()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", re, oe]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...ne()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Ce, lo, is, id]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...ne()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, M1 = (e, {
  cacheSize: t,
  prefix: n,
  experimentalParseClassName: s,
  extend: o = {},
  override: r = {}
}) => (qs(e, "cacheSize", t), qs(e, "prefix", n), qs(e, "experimentalParseClassName", s), fr(e.theme, r.theme), fr(e.classGroups, r.classGroups), fr(e.conflictingClassGroups, r.conflictingClassGroups), fr(e.conflictingClassGroupModifiers, r.conflictingClassGroupModifiers), qs(e, "postfixLookupClassGroups", r.postfixLookupClassGroups), qs(e, "orderSensitiveModifiers", r.orderSensitiveModifiers), pr(e.theme, o.theme), pr(e.classGroups, o.classGroups), pr(e.conflictingClassGroups, o.conflictingClassGroups), pr(e.conflictingClassGroupModifiers, o.conflictingClassGroupModifiers), Il(e, o, "postfixLookupClassGroups"), Il(e, o, "orderSensitiveModifiers"), e), qs = (e, t, n) => {
  n !== void 0 && (e[t] = n);
}, fr = (e, t) => {
  if (t)
    for (const n in t)
      qs(e, n, t[n]);
}, pr = (e, t) => {
  if (t)
    for (const n in t)
      Il(e, t, n);
}, Il = (e, t, n) => {
  const s = t[n];
  s !== void 0 && (e[n] = e[n] ? e[n].concat(s) : s);
}, q1 = (e, ...t) => typeof e == "function" ? rd(ud, e, ...t) : rd(() => M1(ud(), e), ...t), I1 = q1({
  prefix: "dse",
  extend: {
    theme: {
      text: ["ui", "heading", "title", "display"],
      radius: ["panel", "card", "control", "min"],
      shadow: ["elev", "elev-hover", "popover", "highlight"],
      blur: ["glass"]
    }
  }
});
function st(...e) {
  return I1(dp(e));
}
const dd = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, R1 = (e) => {
  const t = function() {
    for (var o = arguments.length, r = new Array(o), i = 0; i < o; i++)
      r[i] = arguments[i];
    return dp(r);
  };
  return {
    compose: function() {
      for (var o = arguments.length, r = new Array(o), i = 0; i < o; i++)
        r[i] = arguments[i];
      return (l) => {
        const u = Object.fromEntries(Object.entries(l || {}).filter((d) => {
          let [c] = d;
          return ![
            "class",
            "className"
          ].includes(c);
        }));
        return t(r.map((d) => d(u)), l?.class, l?.className);
      };
    },
    cva: (o) => (r) => {
      var i;
      if (o?.variants == null) return t(o?.base, r?.class, r?.className);
      const { variants: l, defaultVariants: u } = o, d = Object.keys(l).map((m) => {
        const p = r?.[m], g = u?.[m], b = dd(p) || dd(g);
        return l[m][b];
      }), c = {
        ...u,
        // remove `undefined` props
        ...r && Object.entries(r).reduce((m, p) => {
          let [g, b] = p;
          return typeof b > "u" ? m : {
            ...m,
            [g]: b
          };
        }, {})
      }, f = o == null || (i = o.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((m, p) => {
        let { class: g, className: b, ...w } = p;
        return Object.entries(w).every((x) => {
          let [y, v] = x;
          const C = c[y];
          return Array.isArray(v) ? v.includes(C) : C === v;
        }) ? [
          ...m,
          g,
          b
        ] : m;
      }, []);
      return t(o?.base, d, f, r?.class, r?.className);
    },
    cx: t
  };
}, { cva: $i } = R1(), D1 = $i({
  base: "dse:inline-flex dse:shrink-0 dse:items-center dse:gap-1 dse:font-medium dse:whitespace-nowrap",
  variants: {
    variant: {
      default: "dse:bg-secondary-background dse:text-muted-foreground",
      outline: "dse:text-base-foreground dse:ring-1 dse:ring-border-strong dse:ring-inset",
      /** On imagery: blurred dark chip. */
      overlay: "dse:bg-media-overlay dse:text-base-foreground dse:backdrop-blur-sm",
      solid: "dse:bg-inverted-background dse:text-inverted-foreground"
    },
    size: {
      sm: "dse:h-5 dse:rounded-full dse:px-2 dse:text-ui",
      md: "dse:h-6 dse:rounded-min dse:px-2 dse:text-ui",
      tag: "dse:h-6 dse:rounded-control dse:px-2.5 dse:text-ui"
    }
  },
  defaultVariants: { variant: "default", size: "sm" }
}), Bt = /* @__PURE__ */ V({
  __name: "Badge",
  props: {
    variant: {},
    size: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(e) {
    return (t, n) => (h(), A("span", {
      class: Ee(a(st)(a(D1)({ variant: e.variant, size: e.size }), e.class))
    }, [
      G(t.$slots, "default")
    ], 2));
  }
}), F1 = $i({
  base: [
    "dse:relative dse:inline-flex dse:shrink-0 dse:items-center dse:justify-center dse:gap-1.5 dse:font-medium dse:whitespace-nowrap dse:select-none",
    "dse:transition-[background-color,color,box-shadow,transform] dse:duration-150 dse:active:scale-[0.98]",
    "dse:outline-none dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus",
    "dse:disabled:pointer-events-none dse:disabled:opacity-40"
  ],
  variants: {
    variant: {
      /** The one white CTA per surface. */
      primary: "dse:bg-inverted-background dse:text-inverted-foreground dse:hover:bg-inverted-background-hover",
      secondary: "dse:border dse:border-border-strong dse:bg-card-background-hover dse:text-base-foreground dse:shadow-highlight dse:hover:bg-card-background",
      ghost: "dse:text-muted-foreground dse:hover:bg-secondary-background dse:hover:text-base-foreground",
      subtle: "dse:bg-secondary-background dse:text-base-foreground dse:hover:bg-secondary-background-hover",
      /** Chips that sit on imagery. */
      overlay: "dse:bg-media-overlay dse:text-base-foreground dse:backdrop-blur-sm dse:hover:bg-black/75",
      link: "dse:h-auto dse:px-0 dse:text-muted-foreground dse:hover:text-base-foreground",
      /** Irreversible actions only (delete). Muted, never bright. */
      destructive: "dse:bg-status-danger dse:text-base-foreground dse:hover:bg-status-danger/85"
    },
    size: {
      sm: "dse:h-7 dse:rounded-control dse:px-2.5 dse:text-ui",
      md: "dse:h-8 dse:rounded-control dse:px-3 dse:text-ui",
      lg: "dse:h-9 dse:rounded-control dse:px-4 dse:text-ui",
      "icon-sm": "dse:size-7 dse:rounded-control",
      icon: "dse:size-8 dse:rounded-control",
      "icon-xs": "dse:size-6 dse:rounded-min"
    },
    block: { true: "dse:w-full" }
  },
  compoundVariants: [{ variant: "link", class: "dse:h-auto dse:px-0" }],
  defaultVariants: { variant: "secondary", size: "md" }
}), Te = /* @__PURE__ */ V({
  __name: "Button",
  props: {
    variant: {},
    size: {},
    block: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    class: { type: [Boolean, null, String, Object, Array] },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    return (t, n) => (h(), D(a(xe), {
      as: e.as,
      "as-child": e.asChild,
      type: e.as === "button" && !e.asChild ? "button" : void 0,
      disabled: e.disabled,
      class: Ee(a(st)(a(F1)({ variant: e.variant, size: e.size, block: e.block }), e.class))
    }, {
      default: E(() => [
        G(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "type", "disabled", "class"]));
  }
}), B1 = { key: 1 }, N1 = {
  key: 2,
  class: "dse:text-ui dse:text-subtle-foreground dse:tabular-nums"
}, Es = /* @__PURE__ */ V({
  __name: "SegmentedControl",
  props: /* @__PURE__ */ Hs({
    options: {},
    variant: { default: "plain" },
    size: { default: "md" },
    class: { type: [Boolean, null, String, Object, Array] }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Us(e, "modelValue");
    function n(s) {
      typeof s == "string" && s && (t.value = s);
    }
    return (s, o) => (h(), D(a(S0), {
      type: "single",
      "model-value": t.value,
      class: Ee(
        a(st)(
          "dse:inline-flex dse:items-center dse:gap-0.5",
          e.variant === "contained" && "dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background dse:p-0.5",
          e.class
        )
      ),
      "onUpdate:modelValue": n
    }, {
      default: E(() => [
        (h(!0), A(W, null, pe(e.options, (r) => (h(), D(a(A0), {
          key: r.value,
          value: r.value,
          "aria-label": r.ariaLabel ?? r.label,
          class: Ee(
            a(st)(
              "dse:inline-flex dse:shrink-0 dse:items-center dse:justify-center dse:gap-1.5 dse:whitespace-nowrap dse:text-muted-foreground dse:transition-colors dse:duration-150 dse:outline-none",
              "dse:hover:text-base-foreground dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus",
              "dse:data-[state=on]:bg-secondary-background-hover dse:data-[state=on]:text-base-foreground",
              (e.variant === "contained", "dse:rounded-control"),
              e.size === "sm" ? "dse:h-6 dse:px-2 dse:text-ui" : "dse:h-7 dse:px-2.5 dse:text-ui",
              !r.label && (e.size === "sm" ? "dse:w-6 dse:px-0" : "dse:w-7 dse:px-0")
            )
          )
        }, {
          default: E(() => [
            r.icon ? (h(), D(ws(r.icon), {
              key: 0,
              size: 13
            })) : Y("", !0),
            r.label ? (h(), A("span", B1, R(r.label), 1)) : Y("", !0),
            r.count !== void 0 ? (h(), A("span", N1, R(r.count), 1)) : Y("", !0)
          ]),
          _: 2
        }, 1032, ["value", "aria-label", "class"]))), 128))
      ]),
      _: 1
    }, 8, ["model-value", "class"]));
  }
}), _o = /* @__PURE__ */ B("");
let cd;
function zs(e) {
  _o.value = e, clearTimeout(cd), cd = setTimeout(() => _o.value = "", 2200);
}
const V1 = /* @__PURE__ */ V({
  __name: "Toaster",
  setup(e) {
    const t = q({
      get: () => !!_o.value,
      set: (n) => {
        n || (_o.value = "");
      }
    });
    return (n, s) => (h(), D(a(o0), { duration: 2200 }, {
      default: E(() => [
        O(a(v0), {
          open: t.value,
          "onUpdate:open": s[0] || (s[0] = (o) => t.value = o),
          class: "dse-float dse:rounded-control dse:bg-inverted-background dse:px-3.5 dse:py-2 dse:text-ui dse:font-medium dse:text-inverted-foreground dse:shadow-popover dse:data-[state=open]:animate-pop-in"
        }, {
          default: E(() => [
            O(a(b0), null, {
              default: E(() => [
                Q(R(a(_o)), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["open"]),
        O(a(k0), { class: "dse:fixed dse:top-4 dse:left-1/2 dse:z-[2147483100] dse:-translate-x-1/2 dse:outline-none" })
      ]),
      _: 1
    }));
  }
}), Ei = "body", L1 = /* @__PURE__ */ V({
  __name: "DialogContent",
  props: {
    size: { default: "md" },
    closable: { type: Boolean, default: !0 },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(e) {
    return (t, n) => (h(), D(a(Cy), {
      to: a(Ei),
      defer: ""
    }, {
      default: E(() => [
        O(a(wy), { class: "dse-float dse:fixed dse:inset-0 dse:z-[2147483100] dse:bg-media-overlay dse:backdrop-blur-[3px] dse:data-[state=open]:animate-fade-in" }),
        O(a(hy), {
          class: Ee(
            a(st)(
              "dse-float dse:fixed dse:top-1/2 dse:left-1/2 dse:z-[2147483100] dse:flex dse:max-h-[calc(100vh-48px)] dse:-translate-x-1/2 dse:-translate-y-1/2 dse:flex-col dse:overflow-hidden dse:border dse:border-border-default dse:bg-card-background dse:text-base-foreground dse:shadow-elev dse:outline-none dse:data-[state=open]:animate-pop-in",
              e.size === "sm" && "dse:w-[380px] dse:rounded-panel",
              e.size === "md" && "dse:w-[420px] dse:rounded-panel",
              e.size === "lg" && "dse:w-[min(920px,calc(100vw-48px))] dse:rounded-panel",
              e.class
            )
          )
        }, {
          default: E(() => [
            G(t.$slots, "default"),
            e.closable ? (h(), D(a(Lv), {
              key: 0,
              "aria-label": "Close",
              class: "dse:absolute dse:top-3 dse:right-3 dse:inline-flex dse:size-8 dse:items-center dse:justify-center dse:rounded-full dse:text-subtle-foreground dse:outline-none dse:hover:bg-secondary-background dse:hover:text-base-foreground dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
            }, {
              default: E(() => [
                O(a(Kn), { size: 15 })
              ]),
              _: 1
            })) : Y("", !0)
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 8, ["to"]));
  }
}), Nr = /* @__PURE__ */ V({
  __name: "Tooltip",
  props: {
    content: {},
    side: { default: "top" },
    wrap: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (h(), D(a(R0), null, {
      default: E(() => [
        e.wrap ? (h(), D(a(td), {
          key: 0,
          as: "span",
          class: "dse:inline-flex"
        }, {
          default: E(() => [
            G(t.$slots, "default")
          ]),
          _: 3
        })) : (h(), D(a(td), {
          key: 1,
          "as-child": ""
        }, {
          default: E(() => [
            G(t.$slots, "default")
          ]),
          _: 3
        })),
        O(a(z0), {
          to: a(Ei),
          defer: ""
        }, {
          default: E(() => [
            O(a(V0), {
              side: e.side,
              "side-offset": 6,
              class: "dse-float dse:z-[2147483100] dse:max-w-64 dse:rounded-control dse:bg-inverted-background dse:px-2 dse:py-1 dse:text-ui dse:font-medium dse:text-inverted-foreground dse:shadow-popover dse:data-[state=delayed-open]:animate-fade-in"
            }, {
              default: E(() => [
                Q(R(e.content), 1)
              ]),
              _: 1
            }, 8, ["side"])
          ]),
          _: 1
        }, 8, ["to"])
      ]),
      _: 3
    }));
  }
}), _e = {
  name: "",
  framework: "vue",
  root: "",
  repoPrefix: "",
  systems: [],
  system: { id: "default", label: "Default", kits: [], theme: [] },
  theme: {},
  code: {},
  prototype: null,
  verify: [],
  scopeClass: ""
};
function z1(e) {
  Object.assign(_e, e);
}
const Dt = (e) => _e.repoPrefix ? `${_e.repoPrefix}/${e}` : e, j1 = () => Object.values(_e.theme).join(`
`), Qs = () => Dt(_e.system.theme[0] ?? "tokens.css"), K1 = () => _e.system.kits.map(Dt).join(", ") || Dt(""), Go = (e) => !_e.system.kits.length || _e.system.kits.some((t) => e.startsWith(`${t}/`)), js = (e) => `dse:${_e.name}:${_e.system.id}:${e}`, Ti = [
  {
    id: "color",
    label: "Color",
    prefix: "color-",
    utilities: [
      "bg",
      "text",
      "border(?:-[xytrbl]|-[se])?",
      "ring(?:-offset)?",
      "outline",
      "fill",
      "stroke",
      "divide",
      "placeholder",
      "from",
      "via",
      "to",
      "decoration",
      "caret",
      "accent",
      "shadow",
      "inset-shadow",
      "drop-shadow"
    ],
    preview: "color",
    description: "Semantic roles, not values. Pick a token by what the color does (text, border, surface), never because it looks right."
  },
  {
    id: "font",
    label: "Font family",
    prefix: "font-",
    utilities: ["font"],
    preview: "font",
    description: "Typefaces. One for interface text, one for code at most."
  },
  {
    id: "text",
    label: "Type",
    prefix: "text-",
    utilities: ["text"],
    preview: "text",
    description: "Font sizes. Each can carry its own line-height, weight and letter spacing."
  },
  {
    id: "font-weight",
    label: "Font weight",
    prefix: "font-weight-",
    utilities: ["font"],
    preview: "weight",
    description: "Weights for hierarchy. Fewer is calmer."
  },
  {
    id: "tracking",
    label: "Letter spacing",
    prefix: "tracking-",
    utilities: ["tracking"],
    preview: "tracking",
    description: "Letter spacing, including the spacing carried by type sizes."
  },
  {
    id: "leading",
    label: "Line height",
    prefix: "leading-",
    utilities: ["leading"],
    preview: "leading",
    grid: !0,
    description: "Line heights, including the ones carried by type sizes. They sit on the 4px grid."
  },
  {
    id: "radius",
    label: "Radius",
    prefix: "radius-",
    utilities: ["rounded(?:-(?:[trblse]|tl|tr|bl|br|ss|se|es|ee))?"],
    preview: "radius",
    grid: !0,
    description: "Inner radius = outer radius − padding between them. A 12 card with 4 padding holds an 8 control."
  },
  {
    id: "shadow",
    label: "Elevation",
    prefix: "shadow-",
    utilities: ["shadow"],
    preview: "shadow",
    description: "Shadows by role: one per elevation level."
  },
  {
    id: "inset-shadow",
    label: "Inset shadow",
    prefix: "inset-shadow-",
    utilities: ["inset-shadow"],
    preview: "shadow",
    description: "Shadows drawn inside an element."
  },
  {
    id: "drop-shadow",
    label: "Drop shadow",
    prefix: "drop-shadow-",
    utilities: ["drop-shadow"],
    preview: "value",
    description: "Filter shadows that follow an element’s shape."
  },
  {
    id: "text-shadow",
    label: "Text shadow",
    prefix: "text-shadow-",
    utilities: ["text-shadow"],
    preview: "value",
    description: "Shadows behind text."
  },
  {
    id: "blur",
    label: "Blur",
    prefix: "blur-",
    utilities: ["blur", "backdrop-blur"],
    preview: "blur",
    grid: !0,
    description: "Blur radii for frosted surfaces and filters."
  },
  {
    id: "ease",
    label: "Easing",
    prefix: "ease-",
    utilities: ["ease"],
    preview: "ease",
    description: "Timing curves. Hover a curve to see it move."
  },
  {
    id: "animate",
    label: "Animation",
    prefix: "animate-",
    utilities: ["animate"],
    preview: "animate",
    description: "Named animations with their keyframes. Play one to see it."
  },
  {
    id: "aspect",
    label: "Aspect ratio",
    prefix: "aspect-",
    utilities: ["aspect"],
    preview: "aspect",
    description: "Shapes for media and frames."
  },
  {
    id: "perspective",
    label: "Perspective",
    prefix: "perspective-",
    utilities: ["perspective"],
    preview: "value",
    description: "Depth for 3D transforms."
  },
  {
    id: "breakpoint",
    label: "Breakpoints",
    prefix: "breakpoint-",
    utilities: [],
    preview: "size",
    description: "Viewport widths for responsive variants (`md:` …)."
  },
  {
    id: "container",
    label: "Containers",
    prefix: "container-",
    utilities: ["max-w", "min-w", "w", "@"],
    preview: "size",
    description: "Widths for containers and container queries."
  },
  {
    id: "spacing",
    label: "Spacing",
    prefix: "spacing",
    utilities: [],
    preview: "spacing",
    description: "The spacing step behind p-*, m-*, gap-*, w-* … Use whole steps."
  }
], Sp = {
  "line-height": "leading",
  "letter-spacing": "tracking",
  "font-weight": "font-weight"
}, H1 = [...Ti].sort((e, t) => t.prefix.length - e.prefix.length), U1 = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/-/g, " ");
function Hn(e) {
  const t = H1.find(
    (s) => s.id === "spacing" ? e === "spacing" || e.startsWith("spacing-") : e.startsWith(s.prefix)
  );
  if (t) return t;
  const n = e.split("-")[0];
  return {
    id: n,
    label: U1(n),
    prefix: `${n}-`,
    utilities: [],
    preview: "value",
    description: `Custom \`--${n}-*\` variables. Used through var().`
  };
}
const nl = Ti.map((e) => e.id), cs = /* @__PURE__ */ new Map(), ln = (e) => e.alias ?? e.name, eo = (e) => e.alias ? cs.get(e.alias) ?? e.value : e.value, Vr = /* @__PURE__ */ new Map(), fd = (e) => e.replace(/\/\*[\s\S]*?\*\//g, "");
function Pa(e, t) {
  let n = 0;
  for (let s = t; s < e.length; s++)
    if (e[s] === "{") n++;
    else if (e[s] === "}" && --n === 0) return s + 1;
  return e.length;
}
function W1(e) {
  const t = [];
  for (const n of e.matchAll(/@theme\b([^{;]*)\{/g)) {
    const s = n.index + n[0].length - 1;
    t.push({ body: e.slice(s + 1, Pa(e, s) - 1), inline: /\binline\b/.test(n[1]) });
  }
  return t;
}
function G1(e) {
  const t = [];
  for (const n of e.matchAll(/(^|[\s,}])(:root|html)\s*\{/g)) {
    const s = n.index + n[0].length - 1;
    t.push(e.slice(s + 1, Pa(e, s) - 1));
  }
  return t;
}
function pd(e) {
  const t = [];
  let n = "";
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    if (o === "{") {
      const r = Pa(e, s), i = /@keyframes\s+([\w-]+)\s*$/.exec(n);
      i && Vr.set(i[1], `@keyframes ${i[1]} ${e.slice(s, r)}`), s = r - 1, n = "";
    } else if (o === ";") {
      const r = /^\s*--([\w-]+)\s*:\s*([\s\S]*)$/.exec(n);
      r && t.push([r[1], r[2].replace(/\s+/g, " ").trim()]), n = "";
    } else n += o;
  }
  return t;
}
function md(e, t, n) {
  const s = /^var\(--([\w-]+)\)$/.exec(t)?.[1], r = { ...!!s && cs.has(s) && e.slice(Hn(e).prefix.length) === s ? { alias: s } : {}, ...n ? { inline: n } : {} }, i = /^(.+?)--([\w-]+)$/.exec(e);
  if (i) {
    const [, l, u] = i;
    return { name: e, value: t, parent: l, group: Sp[u] ?? Hn(l).id, ...r };
  }
  return { name: e, value: t, group: Hn(e).id, ...r };
}
function Y1(e) {
  cs.clear();
  for (const o of e)
    for (const r of G1(fd(o)))
      for (const [i, l] of pd(r)) cs.has(i) || cs.set(i, l);
  const t = /* @__PURE__ */ new Map();
  for (const o of e)
    for (const { body: r, inline: i } of W1(fd(o)))
      for (const [l, u] of pd(r))
        l.includes("*") || u === "initial" || t.set(l, md(l, u, i));
  const n = new Set([...t.values()].map((o) => o.alias).filter(Boolean));
  for (const [o, r] of cs)
    n.has(o) || t.has(o) || o.startsWith("tw-") || t.set(o, { ...md(o, r, !1), root: !0 });
  const s = (o) => {
    const r = nl.indexOf(o);
    return r < 0 ? nl.length : r;
  };
  return [...t.values()].sort(
    (o, r) => s(o.group) - s(r.group) || (s(o.group) === nl.length ? o.group.localeCompare(r.group) : 0)
  );
}
let lt = [];
const pn = (e) => lt.filter((t) => t.group === e), Lr = (e) => lt.find((t) => t.name === e);
let Yo = [];
function X1() {
  Vr.clear(), lt = Y1(Object.values(_e.theme)), Yo = [...new Set(lt.map((e) => e.group))].map((e) => ({
    ns: Ti.find((t) => t.id === e) ?? Hn(`${e}-x`),
    tokens: pn(e)
  }));
}
const zr = (e) => Yo.find((t) => t.ns.id === e)?.ns.label ?? e;
function Fo(e, t, n = 0) {
  return n > 8 ? e : e.replace(/var\(--([\w-]+)(?:,\s*([^)]*))?\)/g, (s, o, r) => {
    const i = lt.find((u) => u.name === o), l = t?.(o) ?? (i ? eo(i) : cs.get(o)) ?? r;
    return l === void 0 ? s : Fo(l, t, n + 1);
  });
}
function me(e) {
  if (e.parent) {
    const n = me({ name: e.parent }), s = e.name.slice(e.parent.length + 2);
    return Sp[s] ? n : `${n} ${s}`;
  }
  const t = Hn(e.name);
  return e.name === t.prefix || !e.name.startsWith(t.prefix) ? e.name : e.name.slice(t.prefix.length) || e.name;
}
const Un = (e) => {
  const t = /^(-?\d+(?:\.\d+)?)px$/.exec(e.trim());
  if (t) return Number(t[1]);
  const n = /^(-?\d+(?:\.\d+)?)rem$/.exec(e.trim());
  return n ? Number(n[1]) * 16 : null;
}, $p = Ti.filter((e) => e.grid).map((e) => e.id), Ep = (e) => {
  const t = Un(e);
  return t === null || t % 4 === 0;
};
function J1(e, t, n) {
  return e.group === "text" ? n ? `${t} / ${n}` : t : t.length > 28 ? `${t.slice(0, 26)}…` : t;
}
function Z1() {
  try {
    const e = JSON.parse(localStorage.getItem(js("draft")) ?? "{}");
    return { tokens: e.tokens ?? {}, swaps: e.swaps ?? [], merges: e.merges ?? {} };
  } catch {
    return { tokens: {}, swaps: [], merges: {} };
  }
}
const he = /* @__PURE__ */ Vt({ tokens: {}, swaps: [], merges: {} });
he.tokens;
const Oa = /* @__PURE__ */ new Set([document]), hd = "dse-draft";
function Tp(e) {
  const t = e.documentElement.style;
  for (const s of lt) {
    const o = he.tokens[s.name];
    o === void 0 ? t.removeProperty(`--${ln(s)}`) : t.setProperty(`--${ln(s)}`, o);
  }
  for (const [s, o] of Object.entries(he.merges)) {
    const r = Lr(s), i = Lr(o);
    t.setProperty(`--${r ? ln(r) : s}`, `var(--${i ? ln(i) : o})`), s.startsWith("text-") && t.setProperty(`--${s}--line-height`, `var(--${o}--line-height)`);
  }
  let n = e.getElementById(hd);
  n || (n = e.createElement("style"), n.id = hd, e.head.appendChild(n)), n.textContent = [
    ...he.swaps.map((s) => `${s.selector} { ${s.css} }`),
    ...Q1()
  ].join(`
`);
}
function Q1() {
  const e = (n) => he.tokens[n] ?? (Lr(n) ? eo(Lr(n)) : void 0), t = /* @__PURE__ */ new Map();
  for (const n of lt)
    n.group === "shadow" && he.tokens[n.name] !== void 0 && t.set(n.name, he.tokens[n.name]);
  for (const [n, s] of Object.entries(he.merges))
    n.startsWith("shadow-") && e(s) && t.set(n, e(s));
  return [...t].map(([n, s]) => {
    const o = n.replace(/^shadow-/, "");
    return `.shadow-${o}, .hover\\:shadow-${o}:hover { box-shadow: ${s} !important; }`;
  });
}
function ek() {
  Object.assign(he, Z1()), ve(
    he,
    (e) => {
      localStorage.setItem(js("draft"), JSON.stringify(e)), Oa.forEach(Tp);
    },
    { deep: !0, immediate: !0 }
  );
}
function tk(e) {
  Oa.add(e), Tp(e);
}
function gd(e) {
  Oa.delete(e);
}
const le = (e) => he.tokens[e.name] ?? eo(e), Wn = (e) => he.tokens[e.name] !== void 0 && he.tokens[e.name] !== eo(e);
function Co(e, t) {
  t === eo(e) ? delete he.tokens[e.name] : he.tokens[e.name] = t;
}
function Ap(e) {
  delete he.tokens[e.name];
}
const Ks = (e) => `${e.component}|${e.axis}|${e.option}|${e.from}`, nk = (e) => he.swaps.find((t) => Ks(t) === Ks(e));
function vd(e) {
  const t = he.swaps.findIndex((n) => Ks(n) === Ks(e));
  e.to === e.from ? t >= 0 && he.swaps.splice(t, 1) : t >= 0 ? he.swaps[t] = e : he.swaps.push(e);
}
function sk(e) {
  const t = he.swaps.findIndex((n) => Ks(n) === Ks(e));
  t >= 0 && he.swaps.splice(t, 1);
}
const Pp = q(() => lt.filter(Wn)), At = q(
  () => Pp.value.length + he.swaps.length + Object.keys(he.merges).length
), Gn = (e) => he.merges[e.name];
function Op(e, t) {
  !t || t.name === e.name ? delete he.merges[e.name] : he.merges[e.name] = t.name;
}
const ok = (e) => he.swaps.filter((t) => t.component === e);
function rk(e) {
  for (let t = he.swaps.length - 1; t >= 0; t--)
    he.swaps[t].component === e && he.swaps.splice(t, 1);
}
function Mp(e) {
  delete he.tokens[e.name], delete he.merges[e.name];
}
function ik() {
  for (const e of Object.keys(he.tokens)) delete he.tokens[e];
  for (const e of Object.keys(he.merges)) delete he.merges[e];
  he.swaps.splice(0);
}
const ht = /* @__PURE__ */ mn(null), qp = /* @__PURE__ */ B(0), Je = /* @__PURE__ */ B(null), Qe = (e) => lt.find((t) => t.name === e);
function Ip(e) {
  const t = document.getElementById(e.section);
  if (!t) return null;
  const s = (e.component ? t.querySelector(`[data-dse-component="${CSS.escape(e.component)}"] [data-dse-mount]`) : t.querySelector("[data-playground] [data-dse-mount]"))?.firstElementChild;
  return s instanceof HTMLElement ? s : null;
}
const lk = (e) => e.closest("[data-dse-component]")?.dataset.dseComponent || void 0;
let sl = null;
function ak(e) {
  if (sl?.disconnect(), !e || e.token) return;
  const t = document.getElementById(e.section);
  t && (sl = new MutationObserver(() => {
    const n = Ip(e);
    n && (ht.value?.kind !== "element" || ht.value.el !== n) && (ht.value = { kind: "element", el: n }), qp.value++;
  }), sl.observe(t, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeFilter: ["class", "style", "data-state"]
  }));
}
ve(Je, ak);
function Ma(e) {
  if (Je.value = e, e.token) {
    const n = Qe(e.token);
    n && (ht.value = { kind: "token", token: n });
    return;
  }
  const t = Ip(e);
  t && (ht.value = { kind: "element", el: t });
}
function Ai() {
  Je.value = null, ht.value = null;
}
function Rp(e) {
  ht.value = { kind: "token", token: e };
}
function uk() {
  ht.value?.kind === "token" && Je.value && !Je.value.token ? Ma(Je.value) : Ai();
}
function dk(e) {
  const t = e.closest("[data-token]");
  return t ? Qe(t.dataset.token) ?? null : null;
}
const ck = ["title"], fk = { class: "dse:truncate" }, pk = {
  key: 1,
  class: "dse:size-1.5 dse:shrink-0 dse:rounded-full dse:bg-status-running"
}, Pt = /* @__PURE__ */ V({
  __name: "TokenChip",
  props: {
    token: {},
    struck: { type: Boolean, default: !1 }
  },
  setup(e) {
    return (t, n) => (h(), A("button", {
      type: "button",
      class: Ee(
        a(st)(
          "dse:inline-flex dse:h-6 dse:min-w-0 dse:items-center dse:gap-2 dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background dse:px-2 dse:font-mono dse:text-ui dse:text-base-foreground dse:outline-none dse:hover:bg-secondary-background-hover dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus",
          (e.struck || a(Gn)(e.token)) && "dse:line-through dse:opacity-50"
        )
      ),
      title: a(Gn)(e.token) ? `Merging into --${a(Gn)(e.token)}` : `--${e.token.name}: ${a(le)(e.token)}`,
      onClick: n[0] || (n[0] = (s) => a(Rp)(e.token))
    }, [
      e.token.group === "color" ? (h(), A("span", {
        key: 0,
        class: "dse:size-3 dse:shrink-0 dse:rounded-min dse:border dse:border-border-strong",
        style: Ie({ background: a(le)(e.token) })
      }, null, 4)) : Y("", !0),
      T("span", fk, R(a(me)(e.token)), 1),
      a(Wn)(e.token) ? (h(), A("span", pk)) : Y("", !0)
    ], 10, ck));
  }
}), mk = { class: "dse:flex dse:flex-col" }, hk = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, gk = { class: "dse:text-base-foreground" }, vk = { class: "dse:flex dse:items-center dse:gap-2" }, yk = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:text-ui" }, bk = { class: "dse:text-subtle-foreground" }, xk = { class: "dse:flex dse:items-center dse:gap-1.5" }, Dp = /* @__PURE__ */ V({
  __name: "DraftChanges",
  setup(e) {
    return (t, n) => (h(), A("div", mk, [
      (h(!0), A(W, null, pe(a(Pp), (s) => (h(), A("div", {
        key: s.name,
        class: "dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2"
      }, [
        O(Pt, {
          token: s,
          class: "dse:max-w-36"
        }, null, 8, ["token"]),
        T("span", hk, [
          Q(R(s.value) + " → ", 1),
          T("span", gk, R(a(le)(s)), 1)
        ]),
        O(Te, {
          variant: "ghost",
          size: "icon-xs",
          "aria-label": `Undo ${a(me)(s)}`,
          onClick: (o) => a(Ap)(s)
        }, {
          default: E(() => [
            O(a(Kn), { size: 12 })
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])
      ]))), 128)),
      (h(!0), A(W, null, pe(a(he).swaps, (s) => (h(), A("div", {
        key: `${s.component}${s.axis}${s.option}${s.from}`,
        class: "dse:flex dse:flex-col dse:gap-1.5 dse:border-t dse:border-border-default dse:py-2"
      }, [
        T("div", vk, [
          T("span", yk, [
            Q(R(s.componentName) + " ", 1),
            T("span", bk, R(s.axis === "base" ? "base" : s.axis === "file" ? s.file : `${s.axis} ${s.option}`), 1)
          ]),
          O(Te, {
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Undo swap",
            onClick: (o) => a(sk)(s)
          }, {
            default: E(() => [
              O(a(Kn), { size: 12 })
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        T("div", xk, [
          a(Qe)(s.fromToken) ? (h(), D(Pt, {
            key: 0,
            token: a(Qe)(s.fromToken),
            struck: ""
          }, null, 8, ["token"])) : Y("", !0),
          O(a(bl), {
            size: 12,
            class: "dse:shrink-0 dse:text-subtle-foreground"
          }),
          a(Qe)(s.toToken) ? (h(), D(Pt, {
            key: 1,
            token: a(Qe)(s.toToken)
          }, null, 8, ["token"])) : Y("", !0)
        ])
      ]))), 128)),
      (h(!0), A(W, null, pe(Object.entries(a(he).merges), ([s, o]) => (h(), A("div", {
        key: `merge-${s}`,
        class: "dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2"
      }, [
        a(Qe)(s) ? (h(), D(Pt, {
          key: 0,
          token: a(Qe)(s),
          struck: ""
        }, null, 8, ["token"])) : Y("", !0),
        O(a(Rg), {
          size: 12,
          class: "dse:shrink-0 dse:text-subtle-foreground"
        }),
        a(Qe)(o) ? (h(), D(Pt, {
          key: 1,
          token: a(Qe)(o)
        }, null, 8, ["token"])) : Y("", !0),
        n[0] || (n[0] = T("span", { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:text-ui dse:text-subtle-foreground" }, "merge", -1)),
        O(Te, {
          variant: "ghost",
          size: "icon-xs",
          "aria-label": "Undo merge",
          onClick: (r) => a(Mp)(a(Qe)(s))
        }, {
          default: E(() => [
            O(a(Kn), { size: 12 })
          ]),
          _: 1
        }, 8, ["onClick"])
      ]))), 128))
    ]));
  }
}), Fp = (e) => /@theme\b/.test(e), Bp = (e) => _e.system.kits.length && Go(e) ? "Kit" : /(^|\/)(pages|app|routes|views|layouts|portal)\//.test(e) ? "Pages" : /(^|\/)(components|parts|ui|widgets)\//.test(e) ? "Components" : "Other", So = (e) => e.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
function Np(e) {
  const t = e.parent ?? e.name, n = Hn(t), s = So(me({ name: t })), o = `var\\(--${So(e.name)}\\)${e.alias ? `|var\\(--${So(e.alias)}\\)` : ""}`, r = "(?:\\/\\d+)?(?![\\w-])", i = "(?<![\\w-])(?:[\\w\\-\\[\\]=:]+:)?";
  return n.id === "breakpoint" ? new RegExp(`(?<![\\w-])(?:max-)?${s}:|${o}`, "g") : n.utilities.length ? new RegExp(`${i}(?:${n.utilities.join("|")})-${s}${r}|${o}`, "g") : new RegExp(o, "g");
}
const jr = /* @__PURE__ */ new Map();
function yt(e) {
  const t = jr.get(e.name);
  if (t) return t;
  const n = Np(e), s = [];
  for (const [r, i] of Object.entries(_e.code)) {
    if (Fp(i)) continue;
    const l = i.match(n);
    l && s.push({
      path: r,
      area: Bp(r),
      count: l.length,
      utilities: [...new Set(l)].slice(0, 4)
    });
  }
  s.sort((r, i) => i.count - r.count);
  const o = { files: s, total: s.reduce((r, i) => r + i.count, 0) };
  return jr.set(e.name, o), o;
}
const Rl = (e) => _e.system.kits.map((t) => _e.code[`${t}/${e}`]).find((t) => t !== void 0) ?? _e.code[e] ?? "";
function wk(e, t) {
  let n = 0;
  for (const s of e.matchAll(/(['"`])([^'"`\n]*)\1/g))
    for (const o of s[2].split(/\s+/)) o === t && n++;
  return n;
}
function Vp(e) {
  const t = `component:${e}`, n = jr.get(t);
  if (n) return n;
  const s = new RegExp(`<${So(e)}(?=[\\s/>])`, "g"), o = [];
  for (const [i, l] of Object.entries(_e.code)) {
    if (!/\.(vue|[jt]sx)$/.test(i) || new RegExp(`(^|/)${So(e)}\\.(vue|[jt]sx)$`, "i").test(i)) continue;
    const u = l.match(s);
    u && o.push({ path: i, area: Bp(i), count: u.length, utilities: [] });
  }
  o.sort((i, l) => l.count - i.count);
  const r = { files: o, total: o.reduce((i, l) => i + l.count, 0) };
  return jr.set(t, r), r;
}
function Lp(e, t = 3) {
  const n = Np(e), s = [];
  for (const [o, r] of Object.entries(_e.code)) {
    if (Fp(r)) continue;
    const i = r.split(`
`);
    for (let l = 0; l < i.length && s.length < t; l++) {
      n.lastIndex = 0;
      const u = i[l].trim(), d = n.exec(u);
      if (!d) continue;
      const c = Math.max(0, Math.min(d.index - 70, u.length - 160)), f = u.slice(c, c + 160);
      s.push({
        path: o,
        line: l + 1,
        code: (c > 0 ? "…" : "") + f + (c + 160 < u.length ? "…" : "")
      });
    }
    if (s.length >= t) break;
  }
  return s;
}
function qa(e) {
  const t = new RegExp(`^\\s*--${e}:[^;]+;.*$`, "m");
  for (const [n, s] of Object.entries(_e.theme)) {
    const o = t.exec(s);
    if (o) return { file: Dt(n), line: o[0].trim() };
  }
  return null;
}
const Dl = (e) => qa(e)?.line ?? null;
function kk(e, t) {
  const n = Dl(e.name) ?? `--${e.name}: ${e.value};`, s = n.replace(/(--[\w-]+:\s*)([^;]+)(;)/, `$1${t}$3`), o = yt(e);
  return [
    `### Change the value of --${e.name}`,
    `File: ${qa(e.name)?.file ?? Qs()}`,
    `Find:    ${n}`,
    `Replace: ${s}`,
    `Effect: every use of this token updates (${o.files.length} files, ${o.total} places). No other file changes.`
  ].join(`
`);
}
function _k(e) {
  if (e.axis === "css")
    return [
      `### ${e.componentName}: use --${e.toToken} instead of --${e.fromToken}`,
      `File: ${Dt(e.file)}`,
      `In the CSS rule \`${e.option}\`, change the declaration \`${e.from}\` to \`${e.to}\`.`,
      "Change only that declaration."
    ].join(`
`);
  const t = e.axis === "base" ? "the `base` classes of the cva() definition" : e.axis === "file" ? "the template/class string where it appears (it appears exactly once in this file)" : `\`variants.${e.axis}.${e.option}\` of the cva() definition`;
  return [
    `### ${e.componentName}: use --${e.toToken} instead of --${e.fromToken}`,
    `File: ${Dt(e.file)}`,
    `In ${t}, replace the class \`${e.from}\` with \`${e.to}\`.`,
    "Change only that one class. Keep every other class and its order."
  ].join(`
`);
}
const Ck = {
  text: (e, t) => `\`text-${e}\` -> \`text-${t}\``,
  color: (e, t) => `\`bg-${e}\` -> \`bg-${t}\`, \`hover:text-${e}/60\` -> \`hover:text-${t}/60\``,
  radius: (e, t) => `\`rounded-${e}\` -> \`rounded-${t}\`, \`rounded-t-${e}\` -> \`rounded-t-${t}\``,
  shadow: (e, t) => `\`shadow-${e}\` -> \`shadow-${t}\``
};
function Sk(e, t) {
  const n = lt.find((d) => d.name === e), s = lt.find((d) => d.name === t), o = me(n), r = me(s), l = yt(n).files.map((d) => `  - ${Dt(d.path)} (${d.count}: ${d.utilities.join(", ")})`), u = [
    Dl(n.name),
    n.group === "text" ? Dl(`${n.name}--line-height`) : null
  ].filter(Boolean).map((d) => `  ${d}`);
  return [
    `### Merge --${e} into --${t} (remove ${o})`,
    `1. In each file below, replace every utility that ends in \`-${o}\` with the same utility ending in \`-${r}\`.`,
    `   Keep prefixes (hover:, focus-visible:, data-[…]:)${n.group === "color" ? " and opacity suffixes (/60)" : ""}. Example: ${Ck[n.group]?.(o, r) ?? `\`${o}\` -> \`${r}\``}.`,
    `   Also replace \`var(--${e})\` with \`var(--${t})\`${n.group === "text" ? ` and \`var(--${e}--line-height)\` with \`var(--${t}--line-height)\`` : ""}.`,
    `   Match whole utilities only (\`text-${o}\` must not change \`text-${o}-foo\`).`,
    ...l.length ? l : ["  (no uses found)"],
    `2. In ${qa(n.name)?.file ?? Qs()}, delete:`,
    ...u,
    `3. If the repo configures tailwind-merge with custom scales (extendTailwindMerge), remove '${o}' from its \`${n.group}\` list.`
  ].join(`
`);
}
function $k(e) {
  const t = e?.tokens ?? lt.filter((i) => he.tokens[i.name] !== void 0), n = e?.swaps ?? he.swaps, s = e?.merges ?? Object.entries(he.merges), o = [
    ...t.filter((i) => he.tokens[i.name] !== void 0).map((i) => kk(i, he.tokens[i.name])),
    ...n.map(_k),
    ...s.map(([i, l]) => Sk(i, l))
  ];
  if (!o.length) return "";
  const r = _e.verify.length ? _e.verify.map((i) => `- \`${i}\` passes`) : ["- Run the repo's formatter, type checker and linter; they pass."];
  return [
    `# Design system changes - ${_e.name}`,
    "",
    "Apply exactly these edits in this repo. Do not change anything else.",
    `The design system lives in ${K1()} (tokens in ${Qs()}).`,
    "These come from the design system editor: a designer previewed them live and wants them in code. Open a pull request with them when done.",
    "",
    ...o.flatMap((i, l) => [i.replace(/^### /, `### ${l + 1}. `), ""]),
    "## Verify",
    ...r,
    "- Searching the repo for any removed token utility returns nothing.",
    ""
  ].join(`
`);
}
async function zp(e) {
  const t = $k(e);
  return t ? (await navigator.clipboard.writeText(t), !0) : !1;
}
const Ek = { class: "dse:flex dse:items-center dse:gap-2" }, Tk = { class: "dse:mt-4 dse:max-h-72 dse:overflow-y-auto" }, Ak = { class: "dse:mt-6 dse:flex dse:justify-end dse:gap-2" }, Pk = /* @__PURE__ */ V({
  __name: "GlobalActions",
  setup(e) {
    const t = /* @__PURE__ */ B(!1);
    async function n() {
      const o = await zp();
      zs(o ? "Copied llm.txt - paste it into your coding agent" : "No changes to copy");
    }
    function s() {
      ik(), t.value = !1, zs("Draft discarded");
    }
    return (o, r) => (h(), A("div", Ek, [
      O(Nr, {
        wrap: "",
        side: "bottom",
        content: "Discards the whole draft: every token, component and merge change. To undo one component or token, use Revert in the inspector."
      }, {
        default: E(() => [
          O(Te, {
            variant: "ghost",
            size: "sm",
            disabled: !a(At),
            onClick: r[0] || (r[0] = (i) => t.value = !0)
          }, {
            default: E(() => [
              O(a(rf), { size: 13 }),
              r[3] || (r[3] = Q("Discard draft", -1))
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        _: 1
      }),
      O(Nr, {
        wrap: "",
        side: "bottom",
        content: "Copies the draft as llm.txt: exact edits for your coding agent (Claude Code, Cursor…). Paste it there to apply the changes and open a pull request. Nothing is written to the repo from here."
      }, {
        default: E(() => [
          O(Te, {
            variant: "primary",
            size: "sm",
            disabled: !a(At),
            onClick: n
          }, {
            default: E(() => [
              O(a(sf), { size: 13 }),
              Q("Copy llm.txt" + R(a(At) ? ` · ${a(At)}` : ""), 1)
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        _: 1
      }),
      O(a(Nv), {
        open: t.value,
        "onUpdate:open": r[2] || (r[2] = (i) => t.value = i)
      }, {
        default: E(() => [
          O(L1, {
            size: "md",
            class: "dse:p-6"
          }, {
            default: E(() => [
              O(a($y), { class: "dse:text-heading dse:font-semibold" }, {
                default: E(() => [...r[4] || (r[4] = [
                  Q("Discard the draft?", -1)
                ])]),
                _: 1
              }),
              O(a(vy), { class: "dse:mt-1 dse:text-ui dse:text-muted-foreground" }, {
                default: E(() => [
                  Q(" Removes " + R(a(At)) + " " + R(a(At) === 1 ? "change" : "changes") + ". The repo is not affected. ", 1)
                ]),
                _: 1
              }),
              T("div", Tk, [
                O(Dp)
              ]),
              T("div", Ak, [
                O(Te, {
                  variant: "ghost",
                  onClick: r[1] || (r[1] = (i) => t.value = !1)
                }, {
                  default: E(() => [...r[5] || (r[5] = [
                    Q("Keep drafting", -1)
                  ])]),
                  _: 1
                }),
                O(Te, {
                  variant: "destructive",
                  onClick: s
                }, {
                  default: E(() => [...r[6] || (r[6] = [
                    Q("Discard", -1)
                  ])]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["open"])
    ]));
  }
}), jp = $i({
  base: "dse:relative dse:border",
  variants: {
    variant: {
      /** Default raised card: hairline edge + top highlight + soft shadow. */
      elevated: "dse:rounded-card dse:border-border-default dse:bg-card-background dse:shadow-elev",
      /** Frosted glass, same recipe as the sidebar. */
      glass: "dse:rounded-panel dse:border-border-default dse:bg-media-overlay dse:shadow-popover dse:backdrop-blur-glass dse:backdrop-saturate-[1.6]",
      /** Placeholder / create-new tiles. */
      dashed: "dse:rounded-card dse:border-dashed dse:border-border-strong dse:bg-transparent",
      /** Quiet group inside another surface. */
      inset: "dse:rounded-control dse:border-border-default dse:bg-secondary-background/60"
    },
    padding: { none: "", xs: "dse:p-1", sm: "dse:p-3", md: "dse:p-4", lg: "dse:p-7" },
    interactive: {
      true: "dse:cursor-pointer dse:outline-none dse:transition-[background-color,box-shadow] dse:duration-200 dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
    }
  },
  compoundVariants: [
    {
      variant: "elevated",
      interactive: !0,
      class: "dse:hover:bg-card-background-hover dse:hover:shadow-elev-hover"
    },
    {
      variant: "dashed",
      interactive: !0,
      class: "dse:text-muted-foreground dse:hover:bg-secondary-background/50 dse:hover:text-base-foreground"
    }
  ],
  defaultVariants: { variant: "elevated", padding: "none" }
}), Vn = /* @__PURE__ */ V({
  __name: "Card",
  props: {
    variant: {},
    padding: {},
    interactive: { type: Boolean, default: !1 },
    class: { type: [Boolean, null, String, Object, Array] },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(e) {
    return (t, n) => (h(), D(a(xe), {
      as: e.as,
      "as-child": e.asChild,
      class: Ee(a(st)(a(jp)({ variant: e.variant, padding: e.padding, interactive: e.interactive }), e.class))
    }, {
      default: E(() => [
        G(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), Ia = $i({
  base: [
    "dse:flex dse:items-center dse:gap-2 dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background dse:text-ui dse:text-base-foreground",
    "dse:transition-[border-color,background-color,box-shadow] dse:duration-150",
    "dse:hover:border-border-strong",
    "dse:focus-within:border-border-focus dse:focus-within:ring-2 dse:focus-within:ring-border-focus/30",
    "dse:has-[:disabled]:pointer-events-none dse:has-[:disabled]:opacity-40"
  ],
  variants: {
    size: { sm: "dse:h-7 dse:px-2", md: "dse:h-8 dse:px-2.5", lg: "dse:h-9 dse:px-3" }
  },
  defaultVariants: { size: "md" }
}), Kp = "dse:min-w-0 dse:flex-1 dse:bg-transparent dse:text-ui dse:text-base-foreground dse:outline-none dse:placeholder:text-subtle-foreground", Ok = {
  key: 0,
  class: "dse:shrink-0 dse:text-ui dse:text-subtle-foreground"
}, yd = "dse:flex dse:size-5 dse:shrink-0 dse:items-center dse:justify-center dse:rounded-min dse:text-muted-foreground dse:outline-none dse:transition-colors dse:hover:bg-secondary-background dse:hover:text-base-foreground dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus dse:disabled:pointer-events-none dse:disabled:opacity-40", Mk = /* @__PURE__ */ V({
  __name: "NumberField",
  props: /* @__PURE__ */ Hs({
    size: { default: "sm" },
    min: {},
    max: {},
    step: { default: 1 },
    unit: {},
    ariaLabel: {},
    disabled: { type: Boolean, default: !1 },
    class: { type: [Boolean, null, String, Object, Array] }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Us(e, "modelValue"), n = q({
      get: () => t.value,
      set: (s) => {
        s !== void 0 && Number.isFinite(s) && (t.value = s);
      }
    });
    return (s, o) => (h(), D(a(ow), {
      modelValue: n.value,
      "onUpdate:modelValue": o[0] || (o[0] = (r) => n.value = r),
      min: e.min,
      max: e.max,
      step: e.step,
      disabled: e.disabled,
      class: Ee(a(st)(a(Ia)({ size: e.size }), "dse:gap-1 dse:px-1", e.class))
    }, {
      default: E(() => [
        O(a(iw), {
          class: Ee(yd)
        }, {
          default: E(() => [
            O(a(Dg), { size: 12 })
          ]),
          _: 1
        }),
        O(a(dw), {
          "aria-label": e.ariaLabel,
          class: Ee(a(st)(a(Kp), "dse:w-0 dse:text-center dse:tabular-nums"))
        }, null, 8, ["aria-label", "class"]),
        e.unit ? (h(), A("span", Ok, R(e.unit), 1)) : Y("", !0),
        O(a(aw), {
          class: Ee(yd)
        }, {
          default: E(() => [
            O(a(of), { size: 12 })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue", "min", "max", "step", "disabled", "class"]));
  }
}), Hp = "dse-float dse:z-[2147483100] dse:rounded-card dse:border dse:border-border-default dse:bg-card-background dse:p-1 dse:text-base-foreground dse:shadow-popover dse:outline-none dse:data-[state=open]:animate-pop-in", Up = "dse:relative dse:flex dse:min-h-8 dse:cursor-pointer dse:items-center dse:gap-2.5 dse:rounded-control dse:px-2.5 dse:py-1.5 dse:text-ui dse:text-base-foreground dse:outline-none dse:select-none dse:data-disabled:pointer-events-none dse:data-disabled:opacity-40 dse:data-highlighted:bg-secondary-background dse:[&>svg]:shrink-0 dse:[&>svg]:text-muted-foreground", qk = {
  key: 0,
  class: "dse:text-subtle-foreground"
}, Ik = {
  key: 1,
  class: "dse:ml-auto dse:max-w-40 dse:truncate dse:pl-4 dse:font-mono dse:text-ui dse:text-subtle-foreground"
}, xs = /* @__PURE__ */ V({
  __name: "Select",
  props: /* @__PURE__ */ Hs({
    options: {},
    label: {},
    size: {},
    variant: { default: "field" },
    class: { type: [Boolean, null, String, Object, Array] }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Us(e, "modelValue");
    return (n, s) => (h(), D(a(gw), {
      modelValue: t.value,
      "onUpdate:modelValue": s[0] || (s[0] = (o) => t.value = o)
    }, {
      default: E(() => [
        O(a(jw), {
          "aria-label": e.label,
          class: Ee(
            a(st)(
              a(Ia)({ size: e.size }),
              "dse:cursor-pointer dse:gap-1.5 dse:pr-2 dse:outline-none dse:focus-visible:border-border-focus dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus/30 dse:data-[state=open]:border-border-strong",
              e.variant === "ghost" && "dse:w-auto dse:border-transparent dse:bg-transparent dse:text-muted-foreground dse:hover:border-transparent dse:hover:bg-secondary-background dse:hover:text-base-foreground dse:focus-within:ring-0 dse:data-[state=open]:border-transparent dse:data-[state=open]:bg-secondary-background",
              e.class
            )
          )
        }, {
          default: E(() => [
            e.label ? (h(), A("span", qk, R(e.label), 1)) : Y("", !0),
            O(a(Hw), { class: "dse:truncate" }),
            O(a(ta), {
              size: 13,
              class: "dse:ml-auto dse:shrink-0 dse:text-subtle-foreground"
            })
          ]),
          _: 1
        }, 8, ["aria-label", "class"]),
        O(a(Lw), {
          to: a(Ei),
          defer: ""
        }, {
          default: E(() => [
            O(a(Mw), {
              position: "popper",
              "side-offset": 6,
              align: "start",
              class: Ee(
                a(st)(
                  a(Hp),
                  "dse:flex dse:max-h-[min(320px,var(--reka-select-content-available-height))] dse:min-w-(--reka-select-trigger-width) dse:flex-col"
                )
              )
            }, {
              default: E(() => [
                O(a(Ww), null, {
                  default: E(() => [
                    (h(!0), A(W, null, pe(e.options, (o) => (h(), D(a(Rw), {
                      key: o.value,
                      value: o.value,
                      class: Ee(a(st)(a(Up), "dse:pr-2"))
                    }, {
                      default: E(() => [
                        o.swatch ? (h(), A("span", {
                          key: 0,
                          class: "dse:size-4 dse:shrink-0 dse:rounded-min dse:border dse:border-border-strong",
                          style: Ie({ background: o.swatch })
                        }, null, 4)) : Y("", !0),
                        O(a(Nw), null, {
                          default: E(() => [
                            Q(R(o.label), 1)
                          ]),
                          _: 2
                        }, 1024),
                        o.hint ? (h(), A("span", Ik, R(o.hint), 1)) : Y("", !0),
                        T("span", {
                          class: Ee(a(st)("dse:flex dse:w-4 dse:shrink-0 dse:justify-end", !o.hint && "dse:ml-auto"))
                        }, [
                          O(a(Fw), { class: "dse:text-muted-foreground" }, {
                            default: E(() => [
                              O(a(ms), { size: 13 })
                            ]),
                            _: 1
                          })
                        ], 2)
                      ]),
                      _: 2
                    }, 1032, ["value", "class"]))), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 8, ["to"])
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Rk = {
  key: 0,
  class: "dse:flex dse:items-center dse:justify-between dse:gap-3"
}, Dk = ["for"], bd = "dse:relative dse:inline-flex dse:h-5 dse:w-9 dse:shrink-0 dse:items-center dse:rounded-full dse:bg-secondary-background-hover dse:p-0.5 dse:outline-none dse:transition-colors dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus dse:data-[state=checked]:bg-inverted-background", xd = "dse:block dse:size-4 dse:rounded-full dse:bg-base-foreground dse:shadow dse:transition-transform dse:duration-150 dse:data-[state=checked]:translate-x-4 dse:data-[state=checked]:bg-inverted-foreground", Wp = /* @__PURE__ */ V({
  __name: "Switch",
  props: /* @__PURE__ */ Hs({
    label: {},
    ariaLabel: {}
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Us(e, "modelValue"), n = Ac();
    return (s, o) => e.label ? (h(), A("div", Rk, [
      T("label", {
        for: a(n),
        class: "dse:cursor-pointer dse:text-ui dse:text-base-foreground"
      }, R(e.label), 9, Dk),
      O(a(Xu), {
        id: a(n),
        modelValue: t.value,
        "onUpdate:modelValue": o[0] || (o[0] = (r) => t.value = r),
        class: Ee(bd)
      }, {
        default: E(() => [
          O(a(Ju), {
            class: Ee(xd)
          })
        ]),
        _: 1
      }, 8, ["id", "modelValue"])
    ])) : (h(), D(a(Xu), {
      key: 1,
      modelValue: t.value,
      "onUpdate:modelValue": o[1] || (o[1] = (r) => t.value = r),
      "aria-label": e.ariaLabel,
      class: Ee(bd)
    }, {
      default: E(() => [
        O(a(Ju), {
          class: Ee(xd)
        })
      ]),
      _: 1
    }, 8, ["modelValue", "aria-label"]));
  }
}), Fk = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), Bk = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 1 / 2.4) - 0.055;
function Fl([e, t, n]) {
  const [s, o, r] = [e, t, n].map(Fk), i = Math.cbrt(0.4122214708 * s + 0.5363325363 * o + 0.0514459929 * r), l = Math.cbrt(0.2119034982 * s + 0.6806995451 * o + 0.1073969566 * r), u = Math.cbrt(0.0883024619 * s + 0.2817188376 * o + 0.6299787005 * r);
  return [
    0.2104542553 * i + 0.793617785 * l - 0.0040720468 * u,
    1.9779984951 * i - 2.428592205 * l + 0.4505937099 * u,
    0.0259040371 * i + 0.7827717662 * l - 0.808675766 * u
  ];
}
function Gp([e, t, n]) {
  const s = (e + 0.3963377774 * t + 0.2158037573 * n) ** 3, o = (e - 0.1055613458 * t - 0.0638541728 * n) ** 3, r = (e - 0.0894841775 * t - 1.291485548 * n) ** 3;
  return [
    4.0767416621 * s - 3.3077115913 * o + 0.2309699292 * r,
    -1.2684380046 * s + 2.6097574011 * o - 0.3413193965 * r,
    -0.0041960863 * s - 0.7034186147 * o + 1.707614701 * r
  ];
}
const Yp = ({ l: e, c: t, h: n }) => [
  e,
  t * Math.cos(n * Math.PI / 180),
  t * Math.sin(n * Math.PI / 180)
];
function wd(e, t = 1) {
  const [n, s, o] = Fl(e), r = Math.hypot(s, o), i = r < 1e-4 ? 0 : (Math.atan2(o, s) * 180 / Math.PI + 360) % 360;
  return { l: n, c: r < 1e-4 ? 0 : r, h: i, alpha: t };
}
const kd = (e) => Gp(Yp(e)).map((t) => Math.min(1, Math.max(0, Bk(t)))), Ra = (e) => Gp(Yp(e)).every((t) => t >= -1e-4 && t <= 1 + 1e-4);
function Xp(e, t) {
  let [n, s] = [0, 0.4];
  for (let o = 0; o < 20; o++) {
    const r = (n + s) / 2;
    Ra({ l: e, c: r, h: t }) ? n = r : s = r;
  }
  return n;
}
const Nk = (e) => Ra(e) ? e : { ...e, c: Xp(e.l, e.h) }, Ps = (e, t = 1) => e.endsWith("%") ? parseFloat(e) / 100 : parseFloat(e) / t;
function hs(e) {
  const t = e.trim().toLowerCase(), n = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(t);
  if (n) {
    let r = n[1];
    r.length === 3 && (r = [...r].map((l) => l + l).join(""));
    const i = (l) => parseInt(r.slice(l, l + 2), 16) / 255;
    return wd([i(0), i(2), i(4)], r.length === 8 ? i(6) : 1);
  }
  const s = /^rgba?\(\s*([\d.]+%?)[\s,]+([\d.]+%?)[\s,]+([\d.]+%?)(?:\s*[/,]\s*([\d.]+%?))?\s*\)$/.exec(t);
  if (s)
    return wd(
      [Ps(s[1], 255), Ps(s[2], 255), Ps(s[3], 255)],
      s[4] ? Ps(s[4]) : 1
    );
  const o = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?(?:\s*\/\s*([\d.]+%?))?\s*\)$/.exec(t);
  return o ? {
    l: Ps(o[1]),
    c: parseFloat(o[2]),
    h: parseFloat(o[3]),
    alpha: o[4] ? Ps(o[4]) : 1
  } : null;
}
const mr = (e, t = 3) => {
  const n = e.toFixed(t).replace(/\.?0+$/, "");
  return n === "-0" ? "0" : n;
};
function ao({ l: e, c: t, h: n, alpha: s }) {
  const o = `${mr(e)} ${mr(t)} ${t ? mr(n) : "0"}`;
  return s < 1 ? `oklch(${o} / ${mr(s)})` : `oklch(${o})`;
}
function _d(e, t) {
  const n = kd(e), s = kd(t);
  return n.map((o, r) => o * e.alpha + s[r] * (1 - e.alpha));
}
function Vk(e, t, n) {
  const s = (o) => o.alpha >= 1;
  return s(e) !== s(t) ? 1 / 0 : (n.length || (n = [{ l: 0, c: 0, h: 0, alpha: 1 }]), Math.max(
    ...(s(e) ? [n[0]] : n).map((o) => {
      const r = Fl(_d(e, o)), i = Fl(_d(t, o));
      return Math.hypot(r[0] - i[0], r[1] - i[1], r[2] - i[2]) * 100;
    })
  ));
}
const Da = {
  color: "Color",
  text: "Type",
  radius: "Radius",
  shadow: "Elevation"
}, Lk = () => {
  const e = pn("color").filter((t) => !Gn(t)).map((t) => hs(Fo(le(t), (n) => he.tokens[n]))).filter((t) => !!t && t.alpha >= 1).sort((t, n) => t.l - n.l);
  return e.length ? [e[0], e[e.length - 1]] : [];
};
function Jp(e, t) {
  const n = hs(e), s = hs(t);
  if (n && s) return Vk(n, s, Lk());
  const o = Un(e), r = Un(t);
  return o !== null && r !== null ? Math.abs(o - r) : e === t ? 0 : 1 / 0;
}
function Cd(e) {
  const t = me(e);
  return e.group !== "color" ? e.group : /foreground$/.test(t) ? "foreground" : /^border|edge$/.test(t) ? "border" : /background|^canvas$|^glass|overlay$|^scrim$/.test(t) ? "surface" : t.replace(/-.*/, "");
}
const Kr = (e) => /-hover$/.test(me(e)), zk = (e, t) => me(e).startsWith(me(t)) || me(t).startsWith(me(e)), Fa = (e, t) => e.name !== t.name && Cd(e) === Cd(t) && !Kr(e) && !Kr(t) && !zk(e, t);
class jk {
  constructor(t, n) {
    this.group = t, this.choices = n;
    for (const s of pn(t).filter((o) => !Gn(o))) {
      const o = yt(s);
      this.pool.set(s.name, { token: s, value: Fo(le(s), (r) => he.tokens[r]), uses: o.total, files: o.files.length });
    }
    this.plan = {
      merges: /* @__PURE__ */ new Map(),
      sets: /* @__PURE__ */ new Map(),
      flagged: /* @__PURE__ */ new Map(),
      reasons: /* @__PURE__ */ new Map(),
      hits: {},
      before: this.pool.size,
      after: this.pool.size
    };
  }
  group;
  choices;
  pool = /* @__PURE__ */ new Map();
  plan;
  rule = "";
  live() {
    return [...this.pool.values()];
  }
  note(t, n) {
    const s = this.plan.reasons.get(t) ?? [];
    s.includes(n) || s.push(n), this.plan.reasons.set(t, s), this.plan.hits[this.rule] = (this.plan.hits[this.rule] ?? 0) + 1;
  }
  /** Change a value. `token` defaults to the entry's (line-heights pass
   *  their own). */
  set(t, n, s, o = t.token) {
    this.choices.skipSet.has(o.name) || n === le(o) || (this.plan.sets.set(o.name, { token: o, value: n, rule: this.rule }), o === t.token && (t.value = n), this.note(o.name, s));
  }
  /** Retire `a` into `b`. Reasons don't name the keeper: chains re-point
   *  merges, and the review already shows what each token merges into.
   *  Respects "keep this instead" and "don't merge"
   *  unless forced (merges picked by hand). */
  merge(t, n, s, o = !1) {
    let [r, i] = [t, n];
    if (!o && this.choices.prefer.has(t.token.name) && !this.choices.prefer.has(n.token.name) && ([r, i] = [n, t]), !o && this.choices.protect.has(r.token.name) || !this.pool.has(r.token.name) || !this.pool.has(i.token.name)) return !1;
    this.pool.delete(r.token.name), i.uses += r.uses, i.files = Math.max(i.files, r.files);
    const l = r.token.name;
    this.plan.merges.set(l, { from: r.token, into: i.token, rule: this.rule });
    for (const u of this.plan.merges.values()) u.into.name === l && (u.into = i.token);
    return this.plan.sets.delete(l), this.plan.sets.delete(`${l}--line-height`), this.plan.flagged.delete(l), this.plan.after = this.pool.size, this.note(l, s), !0;
  }
  flag(t, n) {
    this.choices.protect.has(t.token.name) || (this.plan.flagged.set(t.token.name, { token: t.token, rule: this.rule }), this.note(t.token.name, n));
  }
  /** Closest live, same-role token, optionally within `max`. */
  nearest(t, n = 1 / 0, s = () => !0) {
    let o = null, r = 1 / 0;
    for (const i of this.pool.values()) {
      if (!Fa(t.token, i.token) || !s(i)) continue;
      const l = Jp(t.value, i.value);
      l <= n && l < r && ([o, r] = [i, l]);
    }
    return o;
  }
  /** Least used first: they're the ones that should move. */
  byUses() {
    return this.live().sort((t, n) => t.uses - n.uses);
  }
}
const Ut = (e) => Un(e.value), uo = (e) => Ut(e) !== null;
function Sd(e, t, n = 1, s = -1 / 0) {
  const o = Ut(t), r = new Set(
    e.live().filter((l) => l !== t).map(Ut)
  ), i = [Math.floor(o / n) * n, Math.ceil(o / n) * n].map((l) => Math.max(s, l)).sort((l, u) => Math.abs(l - o) - Math.abs(u - o));
  return i.find((l) => !r.has(l)) ?? i[0];
}
const Kk = (e) => hs(e.value) ? 5 : Math.max(4, (Ut(e) ?? 0) * 0.25);
function $d(e, t, n) {
  if (Kr(t.token) || e.plan.merges.has(t.token.name)) return;
  const s = e.nearest(t, Kk(t));
  (!s || !e.merge(t, s, n)) && e.flag(t, `${n} · no close neighbour`);
}
const Hk = [
  {
    id: "min-size",
    groups: ["text"],
    title: "Minimum font size",
    param: { label: "Smallest size", unit: "px", min: 8, max: () => 16, propose: () => 12 },
    on: () => !0,
    why: (e, t) => `Text under ${t}px is hard to read on desktop screens.`,
    run(e, t) {
      for (const n of e.live())
        uo(n) && Ut(n) < t && e.set(n, `${t}px`, `${n.value} is under ${t}px`);
    }
  },
  {
    id: "whole-px",
    groups: ["text", "radius"],
    title: "Whole pixels only",
    on: () => !0,
    why: () => "Half pixels render soft and add sizes nobody can tell apart.",
    run(e) {
      for (const t of e.live())
        uo(t) && !Number.isInteger(Ut(t)) && e.set(t, `${Sd(e, t)}px`, `${t.value} is not a whole pixel`);
    }
  },
  {
    id: "grid",
    groups: ["radius"],
    title: "On the grid",
    param: { label: "Grid step", unit: "px", min: 2, max: () => 8, step: 2, propose: () => 4 },
    on: () => !0,
    why: (e, t) => `Radii in ${t}px steps keep nesting math simple (outer = inner + padding).`,
    run(e, t) {
      for (const n of e.live())
        uo(n) && Ut(n) % t && e.set(n, `${Sd(e, n, t)}px`, `${n.value} is off the ${t}px grid`);
    }
  },
  {
    id: "leading-grid",
    groups: ["text"],
    title: "Line-heights on the grid",
    param: { label: "Grid step", unit: "px", min: 2, max: () => 8, step: 2, propose: () => 4 },
    on: () => !0,
    why: (e, t) => `Line-heights in ${t}px steps keep text on the layout rhythm.`,
    run(e, t) {
      for (const n of e.live()) {
        const s = lt.find((r) => r.name === `${n.token.name}--line-height`), o = s && Un(le(s));
        s && o != null && o % t && e.set(n, `${Math.round(o / t) * t}px`, `line-height ${o}px is off the ${t}px grid`, s);
      }
    }
  },
  {
    id: "same-value",
    groups: ["color", "text", "radius", "shadow"],
    title: "Same value",
    on: () => !0,
    why: () => "Two names for one value make people guess which to use.",
    run(e) {
      for (const t of e.byUses()) {
        if (!e.pool.has(t.token.name)) continue;
        const n = e.nearest(t, 0, (s) => s.uses >= t.uses);
        n && e.merge(t, n, uo(t) ? `same value (${t.value})` : "same value");
      }
    }
  },
  {
    id: "min-step",
    groups: ["text", "radius"],
    title: "Minimum step between sizes",
    param: {
      label: "Smallest step",
      unit: "px",
      min: 1,
      max: () => 8,
      propose: (e) => e.label === "Type" ? 2 : 4
    },
    on: () => !0,
    why: (e, t) => `Sizes less than ${t}px apart read as the same size.`,
    run(e, t) {
      for (let n = !0; n; ) {
        n = !1;
        const s = e.live().filter(uo).sort((o, r) => Ut(o) - Ut(r));
        for (let o = 1; o < s.length; o++) {
          const [r, i] = [s[o - 1], s[o]], l = Ut(i) - Ut(r);
          if (l === 0 || l >= t || !Fa(r.token, i.token)) continue;
          const [u, d] = r.uses <= i.uses ? [r, i] : [i, r];
          if (e.merge(u, d, `only ${l}px apart`)) {
            n = !0;
            break;
          }
        }
      }
    }
  },
  {
    id: "look-alike",
    groups: ["color"],
    title: "Look-alike colors",
    param: {
      label: "Largest difference",
      unit: "ΔE",
      min: 0.5,
      max: () => 10,
      step: 0.5,
      propose: () => 2
    },
    on: () => !0,
    why: (e, t) => `Colors less than ${t} ΔE apart look the same. ΔE is perceptual distance in OKLCH; 2 is about the smallest difference people notice. A solid color never matches a tint; tints must match over both dark and light surfaces. Same role only.`,
    run(e, t) {
      for (const n of e.byUses()) {
        if (!e.pool.has(n.token.name)) continue;
        const s = e.nearest(n, t, (o) => o.uses >= n.uses);
        s && e.merge(n, s, `looks the same (ΔE ${Jp(n.value, s.value).toFixed(1)})`);
      }
    }
  },
  {
    id: "rare",
    groups: ["color", "text", "radius", "shadow"],
    title: "Rarely used",
    param: {
      label: "At most",
      unit: "uses",
      min: 0,
      max: () => 20,
      propose: (e) => Math.min(5, Math.max(1, Math.round(e.median * 0.05)))
    },
    on: () => !0,
    why: (e, t) => `The median ${e.label.toLowerCase()} token is used ${e.median}×. At ${t}× or less it's a one-off; it moves to its closest neighbour.`,
    run(e, t) {
      for (const n of e.byUses())
        e.pool.has(n.token.name) && n.uses <= t && $d(e, n, n.uses ? `used ${n.uses}×` : "unused");
    }
  },
  {
    id: "one-file",
    groups: ["color", "text", "radius", "shadow"],
    title: "Used in one file only",
    on: () => !1,
    why: (e) => `${e.oneFile} ${e.label.toLowerCase()} ${e.oneFile === 1 ? "token appears" : "tokens appear"} in a single file: local styling, not system.`,
    run(e) {
      for (const t of e.byUses())
        e.pool.has(t.token.name) && t.files === 1 && $d(e, t, "used in 1 file");
    }
  },
  {
    id: "cap",
    groups: ["color", "text", "radius", "shadow"],
    title: "Cap the scale",
    param: {
      label: "Keep at most",
      unit: "tokens",
      min: 1,
      max: (e) => e.count,
      propose: (e) => e.core
    },
    on: () => !1,
    why: (e) => `${e.core} of ${e.count} tokens carry 95% of all uses. The least used merge into their closest neighbour until the cap is met.`,
    run(e, t) {
      for (; e.pool.size > t && e.byUses().filter((s) => !Kr(s.token)).some((s) => {
        const o = e.nearest(s);
        return !!o && e.merge(s, o, `over the cap of ${t}`);
      }); )
        ;
    }
  }
], Pi = (e) => Hk.filter((t) => t.groups.includes(e));
function Uk(e) {
  const t = pn(e).filter((r) => !Gn(r)), n = t.map((r) => yt(r).total).sort((r, i) => r - i), s = n.reduce((r, i) => r + i, 0);
  let o = 0;
  for (let r = 0, i = n.length - 1; i >= 0 && r < s * 0.95; i--, o++) r += n[i];
  return {
    label: Da[e],
    count: t.length,
    median: n[Math.floor(n.length / 2)] ?? 0,
    core: Math.max(1, o),
    oneFile: t.filter((r) => yt(r).files.length === 1).length
  };
}
function Wk(e, t, n) {
  const s = new jk(e, n);
  s.rule = "manual";
  for (const o of n.manual) {
    const r = s.pool.get(o.keep);
    for (const i of o.retire) {
      const l = s.pool.get(i);
      r && l && s.merge(l, r, "merged by hand", !0);
    }
  }
  for (const o of Pi(e)) {
    const r = t(o);
    r.on && (s.rule = o.id, o.run(s, r.value));
  }
  return s.plan;
}
const Se = /* @__PURE__ */ B(null), $o = q(() => Se.value ? Da[Se.value.group] : ""), Ae = /* @__PURE__ */ Vt({
  protect: /* @__PURE__ */ new Set(),
  prefer: /* @__PURE__ */ new Set(),
  skipSet: /* @__PURE__ */ new Set(),
  manual: [],
  /** Tokens clicked in the section for a merge by hand. */
  picked: [],
  pickKeep: null
}), Bo = /* @__PURE__ */ Vt({});
function Gk() {
  try {
    Object.assign(Bo, JSON.parse(localStorage.getItem(js("rules")) ?? "{}"));
  } catch {
  }
  ve(Bo, (e) => localStorage.setItem(js("rules"), JSON.stringify(e)), { deep: !0 });
}
const go = q(() => Se.value ? Uk(Se.value.group) : null);
function Is(e) {
  const t = go.value;
  return { on: e.on(t), value: e.param?.propose(t) ?? 0 };
}
function tn(e) {
  const t = Bo[Se.value.group]?.[e.id];
  return { ...Is(e), ...t };
}
function ol(e, t) {
  const n = Se.value.group, s = Bo[n] ??= {};
  s[e.id] = { ...s[e.id], ...t };
}
const Yk = q(() => Se.value ? Pi(Se.value.group).some((e) => {
  const t = tn(e), n = Is(e);
  return t.on !== n.on || !!e.param && t.value !== n.value;
}) : !1);
function Xk() {
  Se.value && delete Bo[Se.value.group];
}
const nt = q(
  () => Se.value ? Wk(Se.value.group, tn, Ae) : null
), rl = (e) => nt.value?.reasons.get(e.name) ?? [], Bl = q(() => {
  const e = /* @__PURE__ */ new Map();
  for (const t of nt.value?.merges.values() ?? []) {
    const n = e.get(t.into.name) ?? { keep: t.into, retire: [] };
    n.retire.push(t.from), e.set(t.into.name, n);
  }
  return [...e.values()];
}), Ed = q(() => [...nt.value?.sets.values() ?? []]), Ln = q(
  () => (nt.value?.merges.size ?? 0) + (nt.value?.sets.size ?? 0)
);
function Zp(e) {
  if (!Se.value || e.group !== Se.value.group) return null;
  if (Ae.picked.includes(e.name))
    return { kind: "picked", keep: Eo.value?.name === e.name };
  const t = nt.value, n = t?.merges.get(e.name);
  if (n) return { kind: "retire", into: n.into };
  const s = Bl.value.find((r) => r.keep.name === e.name);
  if (s) return { kind: "keep", absorbs: s.retire.length };
  const o = t?.sets.get(e.name);
  return o ? { kind: "set", value: o.value } : null;
}
function Jk(e, t) {
  Ae.prefer.delete(t.name), Ae.prefer.add(e.name), Ae.protect.delete(e.name);
}
const Td = (e) => {
  Ae.protect.add(e.name);
}, Zk = (e) => {
  Ae.skipSet.add(e.name);
};
function Qp(e) {
  Ae.protect.delete(e), Ae.skipSet.delete(e), Ae.manual = Ae.manual.map((t) => ({ ...t, retire: t.retire.filter((n) => n !== e) })).filter((t) => t.retire.length && t.keep !== e);
}
const Ad = q(
  () => [.../* @__PURE__ */ new Set([...Ae.protect, ...Ae.skipSet])].map((e) => Qe(e))
);
function em(e) {
  const t = Ae.picked.indexOf(e.name);
  t >= 0 ? Ae.picked.splice(t, 1) : Ae.picked.push(e.name), Ae.pickKeep && !Ae.picked.includes(Ae.pickKeep) && (Ae.pickKeep = null), Se.value && (Se.value.step = "review");
}
const Eo = q(() => {
  const e = Ae.picked.map((t) => Qe(t));
  return e.length ? Ae.pickKeep ? Qe(Ae.pickKeep) ?? null : e.reduce((t, n) => yt(n).total > yt(t).total ? n : t) : null;
});
function Qk() {
  const e = Eo.value;
  !e || Ae.picked.length < 2 || (tm(
    e,
    Ae.picked.filter((t) => t !== e.name).map((t) => Qe(t))
  ), Ae.picked = [], Ae.pickKeep = null);
}
function tm(e, t) {
  for (const n of t) Qp(n.name);
  Ae.manual.push({ keep: e.name, retire: t.map((n) => n.name) });
}
function nm(e) {
  Ai(), ht.value = null, Ae.protect.clear(), Ae.prefer.clear(), Ae.skipSet.clear(), Ae.manual = [], Ae.picked = [], Ae.pickKeep = null, Se.value = { group: e, step: "rules" };
}
function Hr() {
  Se.value = null;
}
function e_() {
  const e = nt.value;
  if (!e) return 0;
  for (const n of e.merges.values()) Op(n.from, n.into);
  for (const n of e.sets.values()) Co(n.token, n.value);
  const t = Ln.value;
  return Se.value = null, t;
}
function hr(e) {
  const t = Zp(e);
  return !Se.value || e.group !== Se.value.group ? "" : t?.kind === "picked" ? "dse:cursor-pointer dse:ring-2 dse:ring-accent dse:ring-offset-2 dse:ring-offset-card-background" : t?.kind === "retire" ? "dse:cursor-pointer dse:opacity-30" : "dse:cursor-pointer";
}
const Pd = (e) => new RegExp(`--${e.name}:[^;]+;\\s*/\\*\\s*(.*?)\\s*\\*/`).exec(j1())?.[1] ?? "", t_ = { vue: "Vue", nuxt: "Nuxt (Vue)", react: "React" }, n_ = {
  color: [
    "Select by role, not by looks: only merge tokens that do the same job (text with text, border with border, surface with surface).",
    "Compare colors in OKLCH. ΔE (OKLab ×100) under 2 is indistinguishable.",
    "A tint (alpha < 1) and a solid color are not interchangeable: a tint changes with what is under it.",
    "Keep deliberate state pairs (x / x-hover) together; merge them only as a pair."
  ],
  text: [
    "Font sizes are whole pixels and at least 12px. Each size carries its line-height (token--line-height), which sits on the 4px grid.",
    "Keep enough steps for hierarchy (label, body, heading, title); adjacent sizes under 2px apart read as the same."
  ],
  radius: [
    "Radii sit on the 4px grid. Nesting rule: inner radius = outer radius − padding between them.",
    "Keep one radius per role (control, card, panel, …)."
  ],
  shadow: [
    "Shadows express elevation by role (resting card, hovered card, floating chrome, popover, dialog). Keep one per distinct elevation level.",
    "Keep deliberate state pairs (elev / elev-hover) together.",
    "The UI is dark: shadows read mostly through the inset top highlight and the size of the falloff, so tokens with similar falloff are candidates to merge."
  ]
};
function s_(e) {
  const t = yt(e), n = lt.find((r) => r.name === `${e.name}--line-height`), s = n ? `${le(e)} / line-height ${le(n)}` : le(e);
  return [
    `### ${e.name}`,
    `- value: \`${s}\``,
    Pd(e) && `- intent (comment in tokens.css): ${Pd(e)}`,
    `- used ${t.total}× in ${t.files.length} ${t.files.length === 1 ? "file" : "files"}`,
    ...t.files.slice(0, 6).map((r) => `  - ${r.path} (${r.count}×: ${r.utilities.join(", ")})`),
    t.files.length > 6 ? `  - …and ${t.files.length - 6} more files` : "",
    ...Lp(e).map((r) => `  - \`${r.path}:${r.line}\` → \`${r.code}\``)
  ].filter(Boolean).join(`
`);
}
function o_(e, t, n) {
  const s = Pi(n).filter((u) => t(u).on).map(
    (u) => `- ${u.title}${u.param ? ` (${u.param.label}: ${t(u).value} ${u.param.unit})` : ""}`
  ), o = [...e.merges.values()].map(
    (u) => `- merge ${u.from.name} → ${u.into.name} (${(e.reasons.get(u.from.name) ?? []).join("; ")})`
  ), r = [...e.sets.values()].map((u) => `- set ${u.token.name} to ${u.value}`), i = [...e.flagged.values()].map(
    (u) => `- unsure: ${u.token.name} (${(e.reasons.get(u.token.name) ?? []).join("; ")})`
  ), l = [...o, ...r, ...i];
  return [
    "Rules enabled in the gallery:",
    ...s,
    "",
    l.length ? "What those rules propose (a starting point, not a decision):" : "Those rules propose no changes.",
    ...l
  ].join(`
`);
}
function r_(e, t, n) {
  const s = Da[e], o = pn(e).filter((i) => !Gn(i)), r = o.length > 1 ? `{ "from": "${o[o.length - 1].name}", "into": "${o[0].name}" }` : '{ "from": "<token>", "into": "<token>" }';
  return [
    `# Suggest how to consolidate the ${s.toLowerCase()} tokens`,
    "",
    `I maintain a small design system (${t_[_e.framework]} + Tailwind CSS v4). Tokens are \`@theme\` custom properties in \`${Qs()}\`; components use them as Tailwind utilities (e.g. \`shadow-elev\`, \`text-ui\`, \`rounded-card\`, \`bg-card-background\`). There are ${o.length} ${s.toLowerCase()} tokens and I think that's too many, but I can't tell the best merging strategy. Recommend one.`,
    "",
    "You can read the repository for more context. Do not edit any files: this is a recommendation.",
    "",
    "## Constraints",
    ...n_[e].map((i) => `- ${i}`),
    "- Prefer keeping the more-used token when two are equivalent, unless the other has the clearer name for the role.",
    "- Fewer tokens is the goal, but never at the cost of a visible role disappearing.",
    "",
    `## The ${o.length} tokens, with usage and code context`,
    "",
    ...o.map(s_).join(`

`).split(`
`),
    "",
    "## What the automatic rules suggest",
    o_(t, n, e),
    "",
    "## Answer in this format",
    "1. **Strategy**: 2-3 sentences. Which roles remain and why.",
    "2. **Decisions**: a table `Token | Decision (keep / merge into X / set value to V) | Why`. One row per token above.",
    "3. **Result**: the final token list, one line each: name, value, role.",
    "4. **Risks**: where a merge would visibly change something, with file paths from the context above.",
    "5. **Plan** as JSON, so I can apply it with the gallery's merge-by-hand controls:",
    "```json",
    `{ "group": "${e}", "merges": [${r}], "values": [] }`,
    "```"
  ].join(`
`);
}
async function i_(e, t, n) {
  await navigator.clipboard.writeText(r_(e, t, n));
}
function Ba(e) {
  return pn(e).map((t) => {
    const n = lt.find((s) => s.name === `${t.name}--line-height`);
    return {
      value: t.name,
      label: me(t),
      hint: J1(t, le(t), n && le(n)),
      swatch: t.group === "color" ? le(t) : void 0
    };
  });
}
const l_ = {
  key: 0,
  class: "dse:flex dse:flex-col dse:gap-4"
}, a_ = { class: "dse:flex dse:items-baseline dse:gap-2" }, u_ = { class: "dse:text-title dse:font-semibold dse:tabular-nums" }, d_ = { class: "dse:text-title dse:font-semibold dse:tabular-nums" }, c_ = { class: "dse:text-ui dse:text-muted-foreground" }, f_ = { class: "dse:text-ui dse:text-subtle-foreground" }, p_ = { class: "dse:text-ui dse:text-muted-foreground" }, m_ = { class: "dse:flex dse:flex-col" }, h_ = { class: "dse:flex dse:items-center dse:gap-3" }, g_ = { class: "dse:flex-1 dse:text-ui dse:font-medium" }, v_ = {
  key: 0,
  class: "dse:text-ui dse:text-muted-foreground dse:tabular-nums"
}, y_ = { class: "dse:text-ui dse:text-muted-foreground" }, b_ = {
  key: 0,
  class: "dse:flex dse:items-center dse:gap-2"
}, x_ = { class: "dse:text-ui dse:whitespace-nowrap dse:text-muted-foreground" }, w_ = { class: "dse:flex dse:flex-col dse:gap-2" }, k_ = {
  key: 0,
  class: "dse:flex dse:items-start dse:gap-2 dse:text-ui dse:text-muted-foreground"
}, __ = { class: "dse:ml-auto dse:text-ui dse:text-subtle-foreground dse:tabular-nums" }, C_ = { class: "dse:flex dse:items-center dse:gap-2 dse:pt-1" }, S_ = { class: "dse:flex-1 dse:text-ui dse:text-subtle-foreground" }, $_ = { class: "dse:text-base-foreground" }, E_ = {
  key: 0,
  class: "dse:flex dse:items-center dse:gap-2 dse:text-ui dse:text-muted-foreground"
}, T_ = {
  key: 1,
  class: "dse:flex dse:flex-col dse:gap-2"
}, A_ = { class: "dse:flex dse:items-center dse:gap-2 dse:bg-accent/10 dse:px-3 dse:py-2" }, P_ = { class: "dse:flex dse:items-center dse:gap-1 dse:text-ui dse:font-semibold dse:tracking-wider dse:text-accent dse:uppercase" }, O_ = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, M_ = { class: "dse:ml-auto dse:shrink-0 dse:text-ui dse:tabular-nums" }, q_ = { class: "dse:text-subtle-foreground" }, I_ = { class: "dse:flex dse:items-center dse:gap-2" }, R_ = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, D_ = { class: "dse:ml-auto dse:shrink-0 dse:text-ui dse:text-subtle-foreground dse:tabular-nums" }, F_ = { class: "dse:flex dse:items-center dse:gap-1 dse:pl-5" }, B_ = { class: "dse:flex dse:min-w-0 dse:flex-1 dse:flex-wrap dse:gap-1" }, N_ = {
  key: 2,
  class: "dse:flex dse:flex-col dse:gap-2"
}, V_ = { class: "dse:flex dse:items-center dse:gap-2" }, L_ = { class: "dse:font-mono dse:text-ui dse:text-subtle-foreground" }, z_ = { class: "dse:text-base-foreground" }, j_ = { class: "dse:flex dse:flex-wrap dse:gap-1" }, K_ = {
  key: 3,
  class: "dse:flex dse:flex-col dse:gap-2"
}, H_ = { class: "dse:flex dse:items-center dse:gap-2" }, U_ = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, W_ = { class: "dse:ml-auto dse:text-ui dse:text-subtle-foreground dse:tabular-nums" }, G_ = { class: "dse:flex dse:flex-wrap dse:gap-1" }, Y_ = { class: "dse:flex dse:items-center dse:gap-2" }, X_ = {
  key: 4,
  class: "dse:flex dse:flex-col dse:gap-2"
}, J_ = { class: "dse:flex dse:flex-wrap dse:gap-2" }, Z_ = /* @__PURE__ */ V({
  __name: "ConsolidatePanel",
  setup(e) {
    const t = q(() => Pi(Se.value.group)), n = q({
      get: () => Se.value.step,
      set: (f) => Se.value.step = f
    }), s = (f) => yt(f).total, o = (f) => f.length > 10 ? "" : f, r = q(() => Ae.picked.map((f) => Qe(f))), i = q(() => [...nt.value?.flagged.values() ?? []].map((f) => f.token)), l = (f) => !nt.value?.merges.has(f.name) && !Ae.manual.some((m) => m.retire.includes(f.name)), u = (f) => Ba(f.group).filter((m) => {
      const p = Qe(m.value);
      return Fa(f, p) && l(p);
    }), d = (f) => f.reduce((m, p) => m + s(p), 0);
    async function c() {
      await i_(Se.value.group, nt.value, tn), zs("Copied - paste it into your coding agent for a merge strategy");
    }
    return (f, m) => a(nt) && a(go) ? (h(), A("div", l_, [
      T("div", null, [
        T("p", a_, [
          T("span", u_, R(a(nt).before), 1),
          O(a(bl), {
            size: 14,
            class: "dse:self-center dse:text-subtle-foreground"
          }),
          T("span", d_, R(a(nt).after), 1),
          T("span", c_, R(a($o).toLowerCase()) + " tokens", 1)
        ]),
        T("p", f_, [
          Q(R(a(nt).merges.size) + " " + R(a(nt).merges.size === 1 ? "merge" : "merges") + " · " + R(a(nt).sets.size) + " value " + R(a(nt).sets.size === 1 ? "change" : "changes") + " ", 1),
          i.value.length ? (h(), A(W, { key: 0 }, [
            Q(" · " + R(i.value.length) + " " + R(i.value.length === 1 ? "needs" : "need") + " your call", 1)
          ], 64)) : Y("", !0)
        ])
      ]),
      O(Vn, {
        variant: "inset",
        padding: "sm",
        class: "dse:flex dse:flex-col dse:items-start dse:gap-2"
      }, {
        default: E(() => [
          m[3] || (m[3] = T("p", { class: "dse:text-ui dse:text-muted-foreground" }, " Not sure what to merge? Copy a prompt with every token, its usage and code, and paste it into your coding agent for a strategy. ", -1)),
          O(Te, {
            size: "sm",
            onClick: c
          }, {
            default: E(() => [
              O(a(zg), { size: 13 }),
              m[2] || (m[2] = Q("Ask your agent", -1))
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      O(Es, {
        modelValue: n.value,
        "onUpdate:modelValue": m[0] || (m[0] = (p) => n.value = p),
        variant: "contained",
        size: "sm",
        class: "dse:self-start",
        options: [
          { value: "rules", label: "1  Rules" },
          { value: "review", label: "2  Review", count: a(Ln) + i.value.length }
        ]
      }, null, 8, ["modelValue", "options"]),
      n.value === "rules" ? (h(), A(W, { key: 0 }, [
        T("p", p_, " Proposed from your " + R(a(go).count) + " " + R(a($o).toLowerCase()) + " tokens and how often each is used. Turn rules on or off and tune them; the count above updates live. ", 1),
        T("div", m_, [
          (h(!0), A(W, null, pe(t.value, (p) => (h(), A("div", {
            key: p.id,
            class: "dse:flex dse:flex-col dse:gap-1.5 dse:border-t dse:border-border-default dse:py-3"
          }, [
            T("div", h_, [
              O(Wp, {
                "model-value": a(tn)(p).on,
                "aria-label": p.title,
                "onUpdate:modelValue": (g) => a(ol)(p, { on: g })
              }, null, 8, ["model-value", "aria-label", "onUpdate:modelValue"]),
              T("span", g_, R(p.title), 1),
              a(tn)(p).on && a(nt).hits[p.id] ? (h(), A("span", v_, R(a(nt).hits[p.id]) + " " + R(a(nt).hits[p.id] === 1 ? "token" : "tokens"), 1)) : Y("", !0)
            ]),
            T("div", {
              class: Ee(["dse:flex dse:flex-col dse:gap-2 dse:pl-12", !a(tn)(p).on && "dse:opacity-50"])
            }, [
              T("p", y_, R(p.why(a(go), a(tn)(p).value)), 1),
              p.param ? (h(), A("div", b_, [
                T("span", x_, R(p.param.label), 1),
                O(Mk, {
                  "model-value": a(tn)(p).value,
                  min: p.param.min,
                  max: p.param.max(a(go)),
                  step: p.param.step,
                  unit: p.param.unit,
                  "aria-label": `${p.title}: ${p.param.label}`,
                  disabled: !a(tn)(p).on,
                  class: "dse:w-32",
                  "onUpdate:modelValue": (g) => a(ol)(p, { value: g })
                }, null, 8, ["model-value", "min", "max", "step", "unit", "aria-label", "disabled", "onUpdate:modelValue"]),
                a(tn)(p).value !== a(Is)(p).value ? (h(), D(Te, {
                  key: 0,
                  variant: "link",
                  size: "sm",
                  class: "dse:ml-auto dse:text-ui",
                  title: `Use the proposed ${a(Is)(p).value} ${p.param.unit}`,
                  onClick: (g) => a(ol)(p, { value: a(Is)(p).value })
                }, {
                  default: E(() => [
                    Q("proposed " + R(a(Is)(p).value), 1)
                  ]),
                  _: 2
                }, 1032, ["title", "onClick"])) : Y("", !0)
              ])) : Y("", !0)
            ], 2)
          ]))), 128))
        ]),
        T("div", w_, [
          a(Yk) ? (h(), D(Te, {
            key: 0,
            variant: "ghost",
            size: "sm",
            class: "dse:self-start",
            onClick: a(Xk)
          }, {
            default: E(() => [
              O(a(xl), { size: 13 }),
              m[4] || (m[4] = Q("Back to proposed rules", -1))
            ]),
            _: 1
          }, 8, ["onClick"])) : Y("", !0),
          O(Te, {
            variant: "primary",
            block: "",
            onClick: m[1] || (m[1] = (p) => n.value = "review")
          }, {
            default: E(() => [
              Q("Review " + R(a(Ln)) + " " + R(a(Ln) === 1 ? "change" : "changes"), 1),
              O(a(bl), { size: 13 })
            ]),
            _: 1
          })
        ])
      ], 64)) : (h(), A(W, { key: 1 }, [
        O(Vn, {
          variant: "inset",
          padding: "sm",
          class: "dse:flex dse:flex-col dse:gap-2"
        }, {
          default: E(() => [
            r.value.length ? (h(), A(W, { key: 1 }, [
              m[8] || (m[8] = T("p", { class: "dse:text-ui dse:font-medium" }, "Merge by hand", -1)),
              (h(!0), A(W, null, pe(r.value, (p) => (h(), A("div", {
                key: p.name,
                class: "dse:flex dse:items-center dse:gap-2"
              }, [
                a(Eo)?.name === p.name ? (h(), D(Bt, {
                  key: 0,
                  class: "dse:w-16 dse:justify-center dse:bg-accent/15 dse:text-base-foreground"
                }, {
                  default: E(() => [
                    O(a(ms), { size: 11 }),
                    m[5] || (m[5] = Q("Keep", -1))
                  ]),
                  _: 1
                })) : (h(), D(Te, {
                  key: 1,
                  variant: "ghost",
                  size: "sm",
                  class: "dse:h-5 dse:w-16 dse:px-0 dse:text-ui",
                  onClick: (g) => a(Ae).pickKeep = p.name
                }, {
                  default: E(() => [...m[6] || (m[6] = [
                    Q("Keep this", -1)
                  ])]),
                  _: 1
                }, 8, ["onClick"])),
                O(Pt, {
                  token: p,
                  struck: a(Eo)?.name !== p.name,
                  class: "dse:max-w-36"
                }, null, 8, ["token", "struck"]),
                T("span", __, R(s(p)) + "×", 1),
                O(Te, {
                  variant: "ghost",
                  size: "icon-xs",
                  "aria-label": `Unpick ${a(me)(p)}`,
                  onClick: (g) => a(em)(p)
                }, {
                  default: E(() => [
                    O(a(Kn), { size: 12 })
                  ]),
                  _: 1
                }, 8, ["aria-label", "onClick"])
              ]))), 128)),
              T("div", C_, [
                T("span", S_, [
                  r.value.length < 2 ? (h(), A(W, { key: 0 }, [
                    Q("Pick at least one more.")
                  ], 64)) : (h(), A(W, { key: 1 }, [
                    Q(R(r.value.length - 1) + " merge into ", 1),
                    T("span", $_, R(a(me)(a(Eo))), 1)
                  ], 64))
                ]),
                O(Te, {
                  variant: "primary",
                  size: "sm",
                  disabled: r.value.length < 2,
                  onClick: a(Qk)
                }, {
                  default: E(() => [...m[7] || (m[7] = [
                    Q("Merge", -1)
                  ])]),
                  _: 1
                }, 8, ["disabled", "onClick"])
              ])
            ], 64)) : (h(), A("p", k_, [
              O(a(Fg), {
                size: 13,
                class: "dse:mt-0.5 dse:shrink-0"
              }),
              T("span", null, "Merge by hand: click tokens in the " + R(a($o)) + " section, then choose the one to keep.", 1)
            ]))
          ]),
          _: 1
        }),
        !a(Ln) && !i.value.length ? (h(), A("p", E_, [
          O(a(ms), {
            size: 14,
            class: "dse:text-status-running"
          }),
          m[9] || (m[9] = Q("Nothing to change with these rules. ", -1))
        ])) : Y("", !0),
        a(Bl).length ? (h(), A("section", T_, [
          m[12] || (m[12] = T("h3", { class: "dse:text-ui dse:font-semibold" }, "Merges", -1)),
          (h(!0), A(W, null, pe(a(Bl), (p) => (h(), D(Vn, {
            key: p.keep.name,
            class: "dse:overflow-hidden"
          }, {
            default: E(() => [
              T("div", A_, [
                T("span", P_, [
                  O(a(ms), { size: 12 }),
                  m[10] || (m[10] = Q("Keep", -1))
                ]),
                O(Pt, {
                  token: p.keep,
                  class: "dse:max-w-40"
                }, null, 8, ["token"]),
                T("span", O_, R(o(a(nt).sets.get(p.keep.name)?.value ?? a(le)(p.keep))), 1),
                T("span", M_, [
                  Q(R(s(p.keep)) + "×", 1),
                  T("span", q_, " +" + R(d(p.retire)), 1)
                ])
              ]),
              (h(!0), A(W, null, pe(p.retire, (g) => (h(), A("div", {
                key: g.name,
                class: "dse:flex dse:flex-col dse:gap-1.5 dse:border-t dse:border-border-default dse:px-3 dse:py-2"
              }, [
                T("div", I_, [
                  O(a(Ig), {
                    size: 13,
                    class: "dse:shrink-0 dse:text-subtle-foreground"
                  }),
                  O(Pt, {
                    token: g,
                    struck: "",
                    class: "dse:max-w-40"
                  }, null, 8, ["token"]),
                  T("span", R_, R(o(a(le)(g))), 1),
                  T("span", D_, R(s(g)) + "×", 1)
                ]),
                T("div", F_, [
                  T("span", B_, [
                    (h(!0), A(W, null, pe(a(rl)(g), (b) => (h(), D(Bt, {
                      key: b,
                      variant: "outline"
                    }, {
                      default: E(() => [
                        Q(R(b), 1)
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  O(Te, {
                    variant: "ghost",
                    size: "sm",
                    class: "dse:h-6 dse:px-2 dse:text-ui",
                    title: `Keep ${a(me)(g)} and merge ${a(me)(p.keep)} into it`,
                    onClick: (b) => a(Jk)(g, p.keep)
                  }, {
                    default: E(() => [...m[11] || (m[11] = [
                      Q("Keep this", -1)
                    ])]),
                    _: 1
                  }, 8, ["title", "onClick"]),
                  O(Te, {
                    variant: "ghost",
                    size: "icon-xs",
                    "aria-label": `Don't merge ${a(me)(g)}`,
                    title: `Don't merge ${a(me)(g)}`,
                    onClick: (b) => a(Td)(g)
                  }, {
                    default: E(() => [
                      O(a(Kn), { size: 12 })
                    ]),
                    _: 1
                  }, 8, ["aria-label", "title", "onClick"])
                ])
              ]))), 128))
            ]),
            _: 2
          }, 1024))), 128))
        ])) : Y("", !0),
        a(Ed).length ? (h(), A("section", N_, [
          m[13] || (m[13] = T("h3", { class: "dse:text-ui dse:font-semibold" }, "Value changes", -1)),
          O(Vn, { class: "dse:divide-y dse:divide-border-default dse:overflow-hidden" }, {
            default: E(() => [
              (h(!0), A(W, null, pe(a(Ed), (p) => (h(), A("div", {
                key: p.token.name,
                class: "dse:flex dse:flex-col dse:gap-1.5 dse:px-3 dse:py-2"
              }, [
                T("div", V_, [
                  O(Pt, {
                    token: p.token,
                    class: "dse:max-w-36"
                  }, null, 8, ["token"]),
                  T("span", L_, [
                    Q(R(a(le)(p.token)) + " → ", 1),
                    T("span", z_, R(p.value), 1)
                  ]),
                  O(Te, {
                    variant: "ghost",
                    size: "icon-xs",
                    class: "dse:ml-auto",
                    "aria-label": `Don't change ${a(me)(p.token)}`,
                    title: `Don't change ${a(me)(p.token)}`,
                    onClick: (g) => a(Zk)(p.token)
                  }, {
                    default: E(() => [
                      O(a(Kn), { size: 12 })
                    ]),
                    _: 1
                  }, 8, ["aria-label", "title", "onClick"])
                ]),
                T("span", j_, [
                  (h(!0), A(W, null, pe(a(rl)(p.token), (g) => (h(), D(Bt, {
                    key: g,
                    variant: "outline"
                  }, {
                    default: E(() => [
                      Q(R(g), 1)
                    ]),
                    _: 2
                  }, 1024))), 128))
                ])
              ]))), 128))
            ]),
            _: 1
          })
        ])) : Y("", !0),
        i.value.length ? (h(), A("section", K_, [
          m[15] || (m[15] = T("h3", { class: "dse:text-ui dse:font-semibold" }, "Needs your call", -1)),
          m[16] || (m[16] = T("p", { class: "dse:-mt-1 dse:text-ui dse:text-muted-foreground" }, " No close neighbour: merging would visibly change these. Pick a home or leave them. ", -1)),
          O(Vn, { class: "dse:divide-y dse:divide-border-default dse:overflow-hidden" }, {
            default: E(() => [
              (h(!0), A(W, null, pe(i.value, (p) => (h(), A("div", {
                key: p.name,
                class: "dse:flex dse:flex-col dse:gap-2 dse:px-3 dse:py-2"
              }, [
                T("div", H_, [
                  O(Pt, {
                    token: p,
                    class: "dse:max-w-40"
                  }, null, 8, ["token"]),
                  T("span", U_, R(o(a(le)(p))), 1),
                  T("span", W_, R(s(p)) + "×", 1)
                ]),
                T("span", G_, [
                  (h(!0), A(W, null, pe(a(rl)(p), (g) => (h(), D(Bt, {
                    key: g,
                    variant: "outline"
                  }, {
                    default: E(() => [
                      Q(R(g), 1)
                    ]),
                    _: 2
                  }, 1024))), 128))
                ]),
                T("div", Y_, [
                  O(xs, {
                    "model-value": "",
                    size: "sm",
                    label: "Merge into…",
                    class: "dse:flex-1",
                    options: u(p),
                    "onUpdate:modelValue": (g) => a(tm)(a(Qe)(g), [p])
                  }, null, 8, ["options", "onUpdate:modelValue"]),
                  O(Te, {
                    variant: "ghost",
                    size: "sm",
                    onClick: (g) => a(Td)(p)
                  }, {
                    default: E(() => [...m[14] || (m[14] = [
                      Q("Leave it", -1)
                    ])]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ]))), 128))
            ]),
            _: 1
          })
        ])) : Y("", !0),
        a(Ad).length ? (h(), A("section", X_, [
          m[17] || (m[17] = T("h3", { class: "dse:text-ui dse:font-semibold" }, "Left as is", -1)),
          T("div", J_, [
            (h(!0), A(W, null, pe(a(Ad), (p) => (h(), A("span", {
              key: p.name,
              class: "dse:flex dse:items-center dse:gap-1"
            }, [
              O(Pt, { token: p }, null, 8, ["token"]),
              O(Te, {
                variant: "ghost",
                size: "icon-xs",
                "aria-label": `Put ${a(me)(p)} back in the plan`,
                title: `Put ${a(me)(p)} back in the plan`,
                onClick: (g) => a(Qp)(p.name)
              }, {
                default: E(() => [
                  O(a(xl), { size: 12 })
                ]),
                _: 1
              }, 8, ["aria-label", "title", "onClick"])
            ]))), 128))
          ])
        ])) : Y("", !0)
      ], 64))
    ])) : Y("", !0);
  }
}), Od = /* @__PURE__ */ V({
  __name: "CopyLlm",
  props: {
    scope: {},
    label: { default: "Copy llm.txt" },
    block: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    async function t() {
      const n = await zp(e.scope);
      zs(n ? "Copied llm.txt - paste it into your coding agent" : "No changes to copy");
    }
    return (n, s) => (h(), D(Te, {
      size: "sm",
      block: e.block,
      disabled: e.disabled,
      onClick: t
    }, {
      default: E(() => [
        O(a(sf), { size: 13 }),
        Q(R(e.label), 1)
      ]),
      _: 1
    }, 8, ["block", "disabled"]));
  }
}), Na = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "Input",
  props: /* @__PURE__ */ Hs({
    size: {},
    mono: { type: Boolean, default: !1 },
    class: { type: [Boolean, null, String, Object, Array] }
  }, {
    modelValue: { default: "" },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e, { expose: t }) {
    const n = Us(e, "modelValue"), s = /* @__PURE__ */ B();
    return t({ focus: () => s.value?.focus(), select: () => s.value?.select() }), (o, r) => (h(), A("label", {
      class: Ee(a(st)(a(Ia)({ size: e.size }), "dse:cursor-text", e.class)),
      style: Ie(o.$attrs.style)
    }, [
      G(o.$slots, "leading"),
      $r(T("input", ue({
        ref_key: "input",
        ref: s,
        "onUpdate:modelValue": r[0] || (r[0] = (i) => n.value = i),
        type: "text"
      }, o.$attrs, {
        class: a(st)(a(Kp), e.mono && "dse:font-mono dse:text-ui")
      }), null, 16), [
        [yg, n.value]
      ]),
      G(o.$slots, "trailing")
    ], 6));
  }
}), Q_ = {
  key: 1,
  class: "dse:flex dse:flex-col dse:gap-2"
}, eC = { class: "dse:text-ui dse:text-muted-foreground" }, tC = /* @__PURE__ */ V({
  __name: "PropControl",
  props: /* @__PURE__ */ Hs({
    control: {}
  }, {
    modelValue: { type: [String, Boolean], required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Us(e, "modelValue"), n = q({
      get: () => String(t.value),
      set: (r) => t.value = r
    }), s = q({
      get: () => !!t.value,
      set: (r) => t.value = r
    }), o = q(
      () => "options" in e.control ? e.control.options.map((r) => ({ value: r, label: r })) : []
    );
    return (r, i) => e.control.type === "toggle" ? (h(), D(Wp, {
      key: 0,
      modelValue: s.value,
      "onUpdate:modelValue": i[0] || (i[0] = (l) => s.value = l),
      label: e.control.label
    }, null, 8, ["modelValue", "label"])) : (h(), A("label", Q_, [
      T("span", eC, R(e.control.label), 1),
      e.control.type === "segment" ? (h(), D(Es, {
        key: 0,
        modelValue: n.value,
        "onUpdate:modelValue": i[1] || (i[1] = (l) => n.value = l),
        size: "sm",
        variant: "contained",
        options: o.value
      }, null, 8, ["modelValue", "options"])) : e.control.type === "select" ? (h(), D(xs, {
        key: 1,
        modelValue: n.value,
        "onUpdate:modelValue": i[2] || (i[2] = (l) => n.value = l),
        size: "sm",
        options: o.value
      }, null, 8, ["modelValue", "options"])) : (h(), D(Na, {
        key: 2,
        modelValue: n.value,
        "onUpdate:modelValue": i[3] || (i[3] = (l) => n.value = l),
        size: "sm"
      }, null, 8, ["modelValue"]))
    ]));
  }
}), sm = {
  background: "Background",
  text: "Text color",
  border: "Border",
  ring: "Ring",
  outline: "Outline",
  fill: "Fill",
  stroke: "Stroke",
  divide: "Divider",
  radius: "Radius",
  shadow: "Shadow",
  "font-size": "Font size",
  blur: "Blur"
}, Md = {
  background: "color",
  text: "color",
  border: "color",
  ring: "color",
  outline: "color",
  fill: "color",
  stroke: "color",
  divide: "color",
  radius: "radius",
  shadow: "shadow",
  "font-size": "text",
  blur: "blur"
}, nC = {
  bg: "background",
  text: "text",
  border: "border",
  "border-t": "border",
  "border-b": "border",
  "border-l": "border",
  "border-r": "border",
  ring: "ring",
  outline: "outline",
  fill: "fill",
  stroke: "stroke",
  divide: "divide",
  placeholder: "text"
}, Fn = /* @__PURE__ */ new Map();
function sC() {
  Fn.clear();
  for (const e of lt) {
    const t = me(e);
    if (e.group === "color")
      for (const [n, s] of Object.entries(nC))
        Fn.set(`${n}-${t}`, { kind: s, token: e });
    if (e.group === "radius")
      for (const n of ["", "t-", "b-", "l-", "r-", "tl-", "tr-", "bl-", "br-"])
        Fn.set(`rounded-${n}${t}`, { kind: "radius", token: e });
    e.group === "shadow" && Fn.set(`shadow-${t}`, { kind: "shadow", token: e }), e.group === "text" && Fn.set(`text-${t}`, { kind: "font-size", token: e }), e.group === "blur" && (Fn.set(`blur-${t}`, { kind: "blur", token: e }), Fn.set(`backdrop-blur-${t}`, { kind: "blur", token: e }));
  }
}
function oC(e) {
  const t = [];
  let n = 0, s = "";
  for (const i of e)
    i === "[" && n++, i === "]" && n--, i === ":" && n === 0 ? (t.push(s), s = "") : s += i;
  const o = s.replace(/^!/, ""), r = /^(.*?)\/(\d+)$/.exec(o);
  return {
    states: t,
    utility: r ? r[1] : o,
    opacity: r ? Number(r[2]) : void 0
  };
}
function om(e) {
  const { states: t, utility: n, opacity: s } = oC(e), o = Fn.get(n);
  return o ? { cls: e, states: t, utility: n, opacity: s, ...o } : null;
}
const rC = {
  hover: "Hover",
  "focus-visible": "Focus",
  "focus-within": "Focus within",
  focus: "Focus",
  active: "Pressed",
  disabled: "Disabled",
  "data-[state=checked]": "Checked",
  "data-[state=on]": "Selected",
  "data-[state=open]": "Open",
  "data-[state=active]": "Active",
  "data-highlighted": "Highlighted",
  "group-hover": "Group hover",
  placeholder: "Placeholder",
  "has-[:disabled]": "Disabled"
}, iC = (e) => e.length ? e.map((t) => rC[t] ?? t).join(" + ") : "Default", lC = {
  hover: ":hover",
  "focus-visible": ":focus-visible",
  "focus-within": ":focus-within",
  focus: ":focus",
  active: ":active",
  disabled: ":disabled",
  "data-[state=checked]": '[data-state="checked"]',
  "data-[state=on]": '[data-state="on"]',
  "data-[state=open]": '[data-state="open"]',
  "data-[state=active]": '[data-state="active"]',
  "data-highlighted": "[data-highlighted]"
};
function aC(e) {
  let t = "";
  for (const n of e) {
    const s = lC[n];
    if (s === void 0) return null;
    t += s;
  }
  return t;
}
function uC(e, t, n) {
  const s = `var(--${ln(t)})`, o = n ? `color-mix(in oklab, ${s} ${n}%, transparent)` : s;
  switch (e) {
    case "background":
      return `background-color: ${o} !important;`;
    case "text":
      return `color: ${o} !important;`;
    case "border":
    case "divide":
      return `border-color: ${o} !important;`;
    case "ring":
      return `--tw-ring-color: ${o} !important;`;
    case "outline":
      return `outline-color: ${o} !important;`;
    case "fill":
      return `fill: ${o} !important;`;
    case "stroke":
      return `stroke: ${o} !important;`;
    case "radius":
      return `border-radius: ${s} !important;`;
    case "shadow":
      return `box-shadow: ${s} !important;`;
    case "font-size":
      return `font-size: ${s} !important; line-height: var(--${t.name}--line-height) !important;`;
    case "blur":
      return `--tw-backdrop-blur: blur(${s}) !important;`;
  }
}
function dC(e, t) {
  const n = me(t), o = `${e.utility.slice(0, e.utility.length - me(e.token).length)}${n}${e.opacity ? `/${e.opacity}` : ""}`;
  return [...e.states, o].join(":");
}
const co = (e) => e.split(/\s+/).filter(Boolean), rm = /(['"`])((?:(?!\1)[^\\]|\\.)*)\1/, qd = (e) => [...e.matchAll(new RegExp(rm.source, "g"))].map((t) => t[2]), Id = (e) => rm.exec(e)?.[2] ?? "";
function fo(e, t) {
  const n = e[t], s = n === "{" ? "}" : n === "[" ? "]" : ")";
  let o = 0;
  for (let r = t; r < e.length; r++)
    if (e[r] === n) o++;
    else if (e[r] === s && --o === 0) return e.slice(t + 1, r);
  return "";
}
function cC(e, t = 0) {
  const n = e.indexOf("cva(", t), s = (n >= 0 ? e.slice(n) : e).replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:'"])\/\/[^\n]*/g, "$1"), o = n >= 0 ? fo(s, 3) : s, r = { base: [], axes: {} }, i = o.trimStart();
  if (/^['"`[]/.test(i))
    r.base = i.startsWith("[") ? co(qd(fo(i, 0)).join(" ")) : co(Id(i));
  else {
    const u = o.search(/\bbase:\s*/);
    if (u >= 0) {
      const d = o.slice(u).replace(/^base:\s*/, "");
      r.base = d.startsWith("[") ? co(qd(fo(d, 0)).join(" ")) : co(Id(d));
    }
  }
  const l = o.search(/\bvariants:\s*\{/);
  if (l >= 0) {
    const u = fo(o, o.indexOf("{", l));
    for (const d of u.matchAll(/['"]?(\w+)['"]?:\s*\{/g)) {
      const c = d[1], f = fo(u, d.index + d[0].length - 1);
      r.axes[c] = {};
      for (const m of f.matchAll(/['"]?([\w-]+)['"]?\s*:\s*(['"`])((?:(?!\2)[^\\]|\\.)*)\2/g))
        r.axes[c][m[1]] = co(m[3]);
    }
  }
  return r;
}
let No = [];
function fC() {
  No = [];
  for (const [e, t] of Object.entries(_e.code))
    if (Go(e))
      for (const n of t.matchAll(/(?:export\s+)?const\s+(\w+?)(?:Variants)?\s*=\s*cva\(/g)) {
        const s = n[1], o = s.charAt(0).toUpperCase() + s.slice(1), r = cC(t, n.index);
        !r.base.length && !Object.keys(r.axes).length || No.push({ id: s.toLowerCase(), name: o, file: e, def: r });
      }
}
const Rd = (e, t) => e.length ? e.filter((n) => t.has(n)).length / e.length : 0;
function pC(e, t) {
  const n = new Set(e.classList);
  let s = null;
  for (const o of No) {
    const r = Rd(o.def.base, n);
    if (r < 0.75) continue;
    const i = {};
    let l = 0, u = 0;
    for (const [c, f] of Object.entries(o.def.axes)) {
      let m = null;
      for (const [p, g] of Object.entries(f)) {
        const b = Rd(g, n);
        b > 0.6 && (!m || b > m[1] || b === m[1] && g.length > (f[m[0]]?.length ?? 0)) && (m = [p, b]);
      }
      m && (i[c] = m[0], l += m[1], u++);
    }
    if (o.def.base.length < 4 && !u) continue;
    const d = r + l + (t && o.name === t ? 0.5 : 0);
    (!s || d > s.score) && (s = { m: { component: o, options: i, el: e }, score: d });
  }
  return s?.m ?? null;
}
function mC(e, t) {
  if (e.component.def.base.includes(t)) return { axis: "base", option: "base" };
  for (const [n, s] of Object.entries(e.options))
    if (e.component.def.axes[n]?.[s]?.includes(t)) return { axis: n, option: s };
  return null;
}
function hC(e, t, n) {
  const s = t === "base" ? [] : e.component.def.axes[t]?.[n] ?? [], o = e.component.def.base.filter((r) => e.el.classList.contains(r));
  return [.../* @__PURE__ */ new Set([...o, ...s])].map((r) => `.${CSS.escape(r)}`).join("");
}
let po = null;
function Ur(e) {
  if (!po) {
    po = /* @__PURE__ */ new Map();
    for (const t of Object.keys(_e.code)) {
      if (!Go(t) || !/\.(vue|[jt]sx)$/.test(t)) continue;
      const n = t.split("/").pop().replace(/\.(vue|[jt]sx)$/, "").replace(/[-_]/g, "").toLowerCase();
      po.has(n) || po.set(n, t);
    }
  }
  return po.get(e.replace(/[-_]/g, "").toLowerCase()) ?? null;
}
function Nl(e, t = 0) {
  if (!e || t > 12) return null;
  if (e.el instanceof Element) return e.el;
  if (e.component) return Nl(e.component.subTree, t + 1);
  if (Array.isArray(e.children))
    for (const n of e.children) {
      const s = Nl(n, t + 1);
      if (s) return s;
    }
  return null;
}
function gC(e) {
  let t = e.__vueParentComponent ?? null;
  const n = [];
  for (; t && Nl(t.subTree) === e; ) {
    const s = t.type.__file ?? "", o = s.startsWith(`${_e.root}/`) ? s.slice(_e.root.length + 1) : "";
    if (o && _e.system.kits.length && Go(o)) {
      const r = t.type.__name ?? o.split("/").pop().replace(/\.vue$/, "");
      n.push({ name: r, file: o });
    } else !s && t.type.__name && Ur(t.type.__name) && n.push({ name: t.type.__name, file: Ur(t.type.__name) });
    t = t.parent;
  }
  return n;
}
const im = (e) => {
  if (typeof e == "function")
    return e.displayName ?? e.name ?? null;
  if (e && typeof e == "object") {
    const t = e;
    return t.displayName ?? t.render?.name ?? (t.type ? im(t.type) : null) ?? null;
  }
  return null;
};
function vC(e) {
  for (let t = e; t; t = t.child) if (t.stateNode instanceof Element) return t.stateNode;
  return null;
}
function yC(e) {
  const t = Object.keys(e).find((o) => o.startsWith("__reactFiber$"));
  if (!t) return [];
  let n = e[t].return;
  const s = [];
  for (; n && vC(n) === e; ) {
    const o = im(n.type), r = o ? Ur(o) : null;
    o && r && s.push({ name: o, file: r }), n = n.return;
  }
  return s;
}
function Wr(e) {
  const t = _e.framework === "react" ? yC(e) : gC(e), n = e.closest("[data-dse-component]")?.dataset.dseComponent;
  return t.find((s) => s.name === n) ?? t.at(-1) ?? null;
}
const lm = (e) => Ur(e), bC = {
  background: "background",
  "background-color": "background",
  color: "text",
  "border-color": "border",
  "border-top-color": "border",
  "border-right-color": "border",
  "border-bottom-color": "border",
  "border-left-color": "border",
  border: "border",
  "border-top": "border",
  "border-bottom": "border",
  outline: "outline",
  "outline-color": "outline",
  fill: "fill",
  stroke: "stroke",
  "border-radius": "radius",
  "border-top-left-radius": "radius",
  "border-top-right-radius": "radius",
  "border-bottom-left-radius": "radius",
  "border-bottom-right-radius": "radius",
  "box-shadow": "shadow",
  "font-size": "font-size",
  "backdrop-filter": "blur",
  filter: "blur"
}, xC = [
  [/:hover\b/g, "hover"],
  [/:focus-visible\b/g, "focus-visible"],
  [/:focus-within\b/g, "focus-within"],
  [/:focus\b/g, "focus"],
  [/:active\b/g, "active"],
  [/:disabled\b/g, "disabled"],
  [/:checked\b/g, "data-[state=checked]"]
];
function wC(e) {
  const t = [];
  let n = 0, s = "";
  for (const o of e)
    (o === "(" || o === "[") && n++, (o === ")" || o === "]") && n--, o === "," && n === 0 ? (t.push(s.trim()), s = "") : s += o;
  return s.trim() && t.push(s.trim()), t;
}
function kC(e) {
  let t = e;
  const n = [];
  for (const [s, o] of xC)
    s.test(t) && (n.push(o), t = t.replace(s, ""));
  return { base: t.trim() || "*", states: n };
}
function _C(e) {
  const n = e.ownerNode?.getAttribute?.("data-vite-dev-id") ?? e.href ?? "";
  if (!n) return null;
  const s = decodeURI(n.split("?")[0].replace(/^https?:\/\/[^/]+/, "").replace(/^\/@fs/, ""));
  return s.startsWith(`${_e.root}/`) ? s.slice(_e.root.length + 1) : s;
}
const CC = (e) => {
  const t = e.ownerNode, n = `${t?.id ?? ""} ${t?.getAttribute?.("data-vite-dev-id") ?? ""} ${e.href ?? ""}`;
  return /dse-draft|dist\/editor\/editor\.css|design-system-editor\/dist/.test(n);
};
function SC(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of lt) t.set(ln(r), r);
  for (const r of lt) t.set(r.name, r);
  const n = [], s = /* @__PURE__ */ new Set(), o = (r, i) => {
    for (const l of r)
      if (l instanceof CSSStyleRule)
        for (const u of wC(l.selectorText)) {
          const { base: d, states: c } = kC(u);
          let f = !1;
          try {
            f = e.matches(d);
          } catch {
            f = !1;
          }
          if (!f) continue;
          const m = /^\.((?:\\.|[^.:#\s[\]>+~])+)/.exec(u)?.[1]?.replace(/\\(.)/g, "$1");
          if (!(m && e.classList.contains(m) && om(m)))
            for (const [p, g] of Object.entries(bC)) {
              const b = l.style.getPropertyValue(p);
              if (b.includes("var("))
                for (const w of b.matchAll(/var\(--([\w-]+)/g)) {
                  const x = t.get(w[1]);
                  if (!x) continue;
                  const y = `${u}|${g}|${x.name}`;
                  s.has(y) || (s.add(y), n.push({
                    use: { cls: `${p}: ${b}`, states: c, utility: p, kind: g, token: x },
                    // As written in the source: without Vue's scoped `[data-v-…]`.
                    source: { axis: "css", option: u.replace(/\[data-v-[\w]+\]/g, "") },
                    selector: u,
                    stateSuffix: "",
                    file: i,
                    property: p,
                    cssVar: w[1]
                  }));
                }
            }
        }
      else "cssRules" in l && o(l.cssRules, i);
  };
  for (const r of document.styleSheets)
    if (!CC(r))
      try {
        o(r.cssRules, _C(r));
      } catch {
      }
  return n;
}
const $C = {
  switch: "Switch",
  checkbox: "Checkbox",
  tab: "Tab",
  radio: "Segment",
  menuitem: "Menu item",
  menuitemcheckbox: "Menu item",
  combobox: "Select",
  meter: "Meter",
  dialog: "Dialog",
  tooltip: "Tooltip",
  img: "Icon"
}, Dd = {
  switch: "Switch track",
  checkbox: "Checkbox box",
  tab: "Tab",
  tablist: "Tab list",
  radio: "Option"
};
function EC(e) {
  const t = e.getAttribute("role") ?? "";
  return Dd[t] ? Dd[t] : e.tagName === "LABEL" ? "Label" : e.tagName === "INPUT" ? "Input" : e.tagName === "H1" || e.tagName === "H2" || e.tagName === "H3" ? "Title" : e.tagName === "P" ? "Text" : e.dataset.state !== void 0 && e.parentElement?.getAttribute("role") === "switch" ? "Thumb" : `<${e.tagName.toLowerCase()}>`;
}
const am = (e) => {
  const t = /^(-?\d+(?:\.\d+)?)px$/.exec(e);
  return t ? Number(t[1]) : null;
}, Fd = (...e) => e.some((t) => {
  const n = am(t);
  return n !== null && n !== 0 && n % 4 !== 0;
}), TC = (e) => e === "rgba(0, 0, 0, 0)" || e === "transparent", ls = (e, t) => [...e.classList].find((n) => !n.includes(":") && t.test(n));
function AC(e, t) {
  const n = Wr(e), s = t ? lm(t) : null, o = n ?? (t && s ? { name: t, file: s } : null), r = pC(e, o?.name ?? t), i = r?.component.file ?? o?.file ?? null, l = !r && o ? Rl(o.file) : "", u = getComputedStyle(e), d = (k, M) => {
    const I = [...k.classList], L = [];
    for (const se of I) {
      const ie = om(se);
      if (!ie) continue;
      const ge = aC(ie.states);
      let H = null, J = null;
      M ? (H = mC(M, se), H && (J = hC(M, H.axis, H.option))) : o && wk(l || Rl(o.file), se) === 1 && (H = { axis: "file", option: o.file }, J = I.map((ae) => `.${CSS.escape(ae)}`).join("")), L.push({ use: ie, source: H, stateSuffix: ge, selector: ge === null ? null : J });
    }
    return L;
  }, c = [...d(e, r), ...SC(e)], f = [], m = (k) => {
    for (const M of k.children)
      if (!(!(M instanceof HTMLElement) && !(M instanceof SVGElement)) && !Wr(M)) {
        if (M instanceof HTMLElement) {
          const I = d(M, null);
          I.length && f.push({ label: EC(M), tokens: I });
        }
        f.length < 6 && m(M);
      }
  };
  m(e);
  const p = new Set(
    c.filter((k) => !k.use.states.length).map((k) => k.use.kind)
  ), g = [], b = (k, M, I, L, se = !1) => {
    if (p.has(k) || se) return;
    const ie = ls(e, L);
    ie && g.push({ label: M, value: I, cls: ie, note: "Not a token" });
  };
  b(
    "background",
    "Background",
    u.backgroundColor,
    /^bg-(?!clip|cover|contain|center|no-repeat|linear|gradient)/,
    TC(u.backgroundColor)
  ), b(
    "text",
    "Text color",
    u.color,
    /^text-(?!left|center|right|justify|xs|sm|base|lg|xl|\d|ellipsis|clip|wrap|nowrap|balance|pretty)/
  ), b(
    "border",
    "Border",
    u.borderColor,
    /^border-(?!\d|t$|b$|l$|r$|x$|y$|solid|dashed|dotted|none|0)/,
    u.borderStyle === "none"
  ), b(
    "radius",
    "Radius",
    parseFloat(u.borderRadius) > 999 ? "full (pill)" : u.borderRadius,
    /^rounded/,
    u.borderRadius === "0px"
  ), b(
    "shadow",
    "Shadow",
    u.boxShadow === "none" ? "none" : "custom",
    /^shadow/,
    u.boxShadow === "none"
  ), !p.has("font-size") && ls(e, /^text-(xs|sm|base|lg|xl|\[)/) && g.push({
    label: "Font size",
    value: u.fontSize,
    cls: ls(e, /^text-(xs|sm|base|lg|xl|\[)/),
    note: "Not a token"
  });
  const w = [u.paddingTop, u.paddingRight, u.paddingBottom, u.paddingLeft], x = new Set(w).size === 1 ? w[0] : w[0] === w[2] && w[1] === w[3] ? `${w[0]} ${w[1]}` : w.join(" "), y = [
    {
      label: "Size",
      value: `${Math.round(e.offsetWidth)} × ${Math.round(e.offsetHeight)}px`,
      cls: ls(e, /^(h|size|min-h)-/)
    },
    {
      label: "Padding",
      value: x,
      cls: ls(e, /^(p|px|py|pt|pb|pl|pr)-/),
      offGrid: Fd(...w)
    },
    ...u.display.includes("flex") || u.display.includes("grid") ? [
      {
        label: "Gap",
        value: u.columnGap === "normal" ? "0px" : u.columnGap,
        cls: ls(e, /^gap/),
        offGrid: Fd(u.columnGap)
      }
    ] : [],
    {
      label: "Font",
      value: `${u.fontSize} / ${u.lineHeight} · ${u.fontWeight}`,
      cls: ls(e, /^font-(medium|semibold|bold|normal)/)
    },
    ...u.borderStyle !== "none" && u.borderTopWidth !== "0px" ? [{ label: "Border width", value: u.borderTopWidth }] : []
  ], v = am(`${e.offsetHeight}px`);
  v !== null && v % 4 !== 0 && (y[0].offGrid = !0);
  const C = e.getAttribute("role") ?? "", F = o?.name ?? r?.component.name ?? $C[C] ?? `<${e.tagName.toLowerCase()}>`, S = [r ? Object.entries(r.options).map(([k, M]) => `${k} ${M}`).join(" · ") : "", i].filter(Boolean).join(" · ");
  return { name: F, detail: S, match: r, kit: o, tokens: c, parts: f, hardcoded: g, layout: y };
}
const dt = /* @__PURE__ */ mn(null), PC = /* @__PURE__ */ B("edit"), um = (e) => `  - ${Dt(e.path)} (${e.count}×)`;
function OC(e, t) {
  let n = 0, s = "";
  for (let o = e.indexOf("{", t); o >= 0 && o < e.length; o++) {
    if (e[o] === "{") n++;
    else if (e[o] === "}" && --n === 0) break;
    n === 1 && e[o] !== "{" && (s += e[o]);
  }
  return s;
}
function MC(e) {
  const t = e.indexOf("defineProps<{") >= 0 ? e.indexOf("defineProps<{") : e.search(/(?:interface\s+\w*Props\b[^{]*|type\s+\w*Props\s*=[^{]*)\{/);
  return t < 0 ? [] : [...OC(e, t).matchAll(/^\s*([\w$]+)(\??):\s*([^\n]+)/gm)].map(
    (n) => `${n[1]}${n[2]}: ${n[3].trim().replace(/[,;]$/, "")}`
  );
}
function qC(e) {
  const t = new RegExp(`<${e}(?=[\\s/>])`);
  for (const [n, s] of Object.entries(_e.code)) {
    if (_e.system.kits.length && Go(n)) continue;
    const o = s.split(`
`), r = o.findIndex((i) => t.test(i));
    if (r >= 0) return `${Dt(n)}:${r + 1} → ${o[r].trim()}`;
  }
  return null;
}
function dm(e, t) {
  const n = lm(e), s = n ? Rl(n) : "", o = No.find((d) => d.name === e), r = Vp(e), i = [`# Component: ${e}`, ""];
  if (n && i.push(`- Component file: ${Dt(n)}`), o && o.file !== n && i.push(`- Variant classes (cva): ${Dt(o.file)}`), o)
    for (const [d, c] of Object.entries(o.def.axes))
      i.push(`- \`${d}\`: ${Object.keys(c).join(" | ")}`);
  const l = s ? MC(s) : [];
  l.length && i.push("- Props:", ...l.map((d) => `  - ${d}`)), t?.options && Object.keys(t.options).length && i.push(
    `- This instance: ${Object.entries(t.options).map(([d, c]) => `${d}="${c}"`).join(" ")}`
  ), t?.rows?.length && i.push(
    "- Design tokens it uses here:",
    ...t.rows.map(
      (d) => `  - ${sm[d.use.kind]}${d.use.states.length ? ` (${d.use.states.join(", ")})` : ""}: \`${d.use.cls}\` → --${d.use.token.name}: ${le(d.use.token)}`
    )
  ), i.push(
    `- Used ${r.total}× in ${r.files.length} files, e.g.:`,
    ...r.files.slice(0, 5).map(um)
  );
  const u = qC(e);
  return u && i.push(`- Example: ${u}`), i.join(`
`);
}
function cm(e) {
  for (const [t, n] of Object.entries(_e.theme)) {
    const s = n.split(`
`), o = s.findIndex((r) => r.trimStart().startsWith(`--${e.name}:`));
    if (o >= 0) return `${Dt(t)}:${o + 1} → ${s[o].trim()}`;
  }
  return null;
}
function fm(e) {
  const t = yt(e);
  return [
    ...new Set(
      t.files.flatMap((n) => n.utilities).filter((n) => !n.startsWith("var(")).map((n) => n.replace(/^.*:/, ""))
    )
  ].slice(0, 8);
}
function IC(e) {
  const t = Hn(e.parent ?? e.name), n = yt(e), s = fm(e);
  return [
    `# Design token: --${e.name}`,
    "",
    `- Value: \`${le(e)}\`${Wn(e) ? ` (draft; source has \`${e.value}\`)` : ""}`,
    `- Group: ${zr(e.group)} (Tailwind theme namespace \`--${t.prefix}*\`)`,
    `- Declared in: ${cm(e) ?? Qs()}`,
    e.parent ? `- Carried by \`--${e.parent}\`: applies wherever its utility is used.` : "",
    `- Use it as: ${[...s.map((r) => `\`${r}\``), `\`var(--${ln(e)})\``].join(", ")}`,
    e.alias ? `- Value lives in \`--${e.alias}\` (on :root); \`--${e.name}\` points at it.` : "",
    `- Used ${n.total}× in ${n.files.length} files, e.g.:`,
    ...n.files.slice(0, 5).map(um),
    ...Lp(e, 2).map((r) => `- Example: ${Dt(r.path)}:${r.line} → ${r.code}`)
  ].filter(Boolean).join(`
`);
}
function RC(e) {
  const t = pn(e);
  return [
    `# Design tokens: ${zr(e)} (${t.length})`,
    "",
    `Declared in ${Qs()} (Tailwind v4 \`@theme\`).`,
    "",
    ...t.map((n) => `- --${n.name}: ${le(n)} (${yt(n).total}×, \`${me(n)}\`)`)
  ].join(`
`);
}
const DC = { class: "dse:inline-flex" }, Va = /* @__PURE__ */ V({
  __name: "CopyRef",
  props: {
    what: {},
    text: { type: Function }
  },
  setup(e) {
    async function t() {
      await navigator.clipboard.writeText(e.text()), zs(`Copied ${e.what} - paste it into your LLM`);
    }
    return (n, s) => (h(), A("span", DC, [
      O(Nr, {
        content: `Copy ${e.what} for your LLM: files, variants, tokens and where it's used`
      }, {
        default: E(() => [
          O(Te, {
            variant: "ghost",
            size: "icon-sm",
            "aria-label": `Copy ${e.what} reference`,
            onClick: t
          }, {
            default: E(() => [
              O(a(qg), { size: 14 })
            ]),
            _: 1
          }, 8, ["aria-label"])
        ]),
        _: 1
      }, 8, ["content"])
    ]));
  }
}), Qn = {
  adapter: null,
  /** The repo's page color behind cells, for light repos; null otherwise. */
  surface: null
}, Vo = /* @__PURE__ */ mn([]), Gr = /* @__PURE__ */ Vt({}), FC = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function Vl(e, t) {
  return t ? Object.entries(e.components ?? {}).find(([, s]) => s === t)?.[0] ?? Qn.adapter?.nameOf?.(t) : void 0;
}
function BC(e) {
  const t = e.auto, n = t.name ?? Vl(e, t.component), s = No.find((o) => o.name === n);
  return s ? Object.entries(s.def.axes).filter(([o]) => !t.skip?.includes(o)).map(([o, r]) => {
    const i = Object.keys(r), l = i.length === 1 && i[0] === "true";
    return {
      title: l ? "State" : FC(o),
      prop: o,
      cell: o === "size" ? "md" : "sm",
      items: (l ? ["true"] : i).map((u) => ({
        label: l ? o : u,
        name: n,
        component: t.component,
        props: { ...t.props, [o]: l ? !0 : u },
        children: /^icon/.test(u) ? t.iconChildren ?? "✦" : t.children
      }))
    };
  }) : [];
}
function NC(e, t) {
  Qn.adapter = t;
  const n = /* @__PURE__ */ new Set();
  Vo.value = e.filter((s) => s && s.id && !n.has(s.id) && n.add(s.id)).sort((s, o) => (s.order ?? 100) - (o.order ?? 100)).map((s) => {
    const o = [...s.auto ? BC(s) : [], ...s.groups ?? []].map((i) => ({
      ...i,
      items: i.items.map((l) => ({ ...l, name: l.name ?? Vl(s, l.component) }))
    })), r = s.playground ? s.playground.name ?? Vl(s, s.playground.component) : void 0;
    return s.playground && (Gr[s.id] = { ...s.playground.defaults }), { ...s, groups: o, playgroundName: r, names: Object.keys(s.components ?? {}) };
  });
}
const VC = (e) => {
  const t = e.closest("section[id]")?.id;
  return Vo.value.find((n) => n.id === t);
};
function LC(e) {
  const t = e.playground, n = { ...Gr[e.id] ?? {} };
  if (t.render) return { render: () => t.render(n) };
  const s = typeof t.children == "function" ? t.children(n) : t.children;
  return { component: t.component, props: n, children: s };
}
const zC = { class: "dse:mb-2 dse:flex dse:items-baseline dse:justify-between" }, jC = { class: "dse:text-ui dse:text-subtle-foreground" }, KC = {
  key: 0,
  class: "dse:text-ui dse:text-subtle-foreground"
}, HC = { class: "dse:mb-1 dse:text-ui dse:font-medium dse:tracking-wider dse:text-subtle-foreground dse:uppercase" }, UC = ["title"], WC = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:text-ui" }, GC = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, YC = { class: "dse:w-6 dse:text-right dse:text-ui dse:text-muted-foreground dse:tabular-nums" }, pm = /* @__PURE__ */ V({
  __name: "UsageList",
  props: {
    usage: {},
    noun: { default: "places" }
  },
  setup(e) {
    const t = ["Kit", "Components", "Pages", "Other"], n = q(
      () => t.map((o) => ({ area: o, files: e.usage.files.filter((r) => r.area === o) })).filter(
        (o) => o.files.length
      )
    ), s = (o) => o.split("/").pop().replace(/\.(vue|[jt]sx?|css)$/, "");
    return (o, r) => (h(), A("div", null, [
      T("div", zC, [
        r[0] || (r[0] = T("h4", { class: "dse:text-ui dse:font-semibold" }, "Used in", -1)),
        T("span", jC, R(e.usage.files.length) + " files · " + R(e.usage.total) + " " + R(e.noun), 1)
      ]),
      e.usage.files.length ? Y("", !0) : (h(), A("p", KC, "Not used anywhere yet.")),
      (h(!0), A(W, null, pe(n.value, (i) => (h(), A("div", {
        key: i.area,
        class: "dse:mb-3"
      }, [
        T("p", HC, R(i.area) + " · " + R(i.files.length), 1),
        (h(!0), A(W, null, pe(i.files, (l) => (h(), A("div", {
          key: l.path,
          class: "dse:flex dse:items-center dse:gap-2 dse:rounded-control dse:px-2 dse:py-1 dse:hover:bg-secondary-background",
          title: l.utilities.join("  ") || l.path
        }, [
          T("span", WC, R(s(l.path)), 1),
          T("span", GC, R(l.path.split("/").slice(0, -1).join("/") || "."), 1),
          T("span", YC, R(l.count), 1)
        ], 8, UC))), 128))
      ]))), 128))
    ]));
  }
}), XC = { class: "dse:flex dse:flex-col dse:gap-6" }, JC = { class: "dse:relative dse:pr-8" }, ZC = { class: "dse:text-ui dse:font-semibold" }, QC = { class: "dse:mt-0.5 dse:truncate dse:text-ui dse:text-subtle-foreground" }, eS = {
  key: 0,
  class: "dse:flex dse:flex-col dse:gap-4"
}, tS = { class: "dse:w-24 dse:shrink-0 dse:text-muted-foreground" }, nS = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui" }, sS = {
  key: 1,
  class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
}, oS = {
  key: 0,
  class: "dse:mb-3 dse:flex dse:flex-wrap dse:items-center dse:gap-1.5 dse:text-ui"
}, rS = {
  key: 1,
  class: "dse:text-ui dse:text-subtle-foreground"
}, iS = {
  key: 0,
  class: "dse:mt-3 dse:mb-1 dse:text-ui dse:font-medium dse:tracking-wider dse:text-subtle-foreground dse:uppercase"
}, lS = { class: "dse:flex dse:items-center dse:gap-2" }, aS = { class: "dse:flex-1 dse:text-ui" }, uS = {
  key: 1,
  class: "dse:text-ui dse:text-subtle-foreground"
}, dS = { class: "dse:flex dse:items-center dse:gap-2" }, cS = { class: "dse:flex dse:items-center dse:gap-2 dse:text-ui dse:text-subtle-foreground" }, fS = { class: "dse:flex-1 dse:truncate" }, pS = { key: 0 }, mS = { class: "dse:w-24 dse:shrink-0 dse:text-muted-foreground" }, hS = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui" }, gS = {
  key: 0,
  class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
}, vS = /* @__PURE__ */ V({
  __name: "ElementInspector",
  props: {
    el: {}
  },
  setup(e) {
    const t = q(() => {
      qp.value, he.swaps.length;
      const $ = AC(e.el, lk(e.el));
      return $.tokens.sort((S, k) => S.use.states.length - k.use.states.length), $;
    }), n = q(
      () => [
        { label: "Root", rows: t.value.tokens },
        ...t.value.parts.map(($) => ({ label: $.label, rows: $.tokens }))
      ].filter(($) => $.rows.length)
    ), s = q(() => {
      const $ = e.el.closest("[data-playground]") ? VC(e.el) : void 0;
      return $?.playground ? $ : void 0;
    }), o = ($) => !!($.source && $.selector !== null), r = () => ({
      id: t.value.match?.component.id ?? t.value.kit.file,
      file: t.value.match?.component.file ?? t.value.kit.file
    }), i = ($) => ({
      component: r().id,
      axis: $.source.axis,
      option: $.source.option,
      from: $.use.cls
    });
    function l($) {
      const S = o($) ? nk(i($)) : void 0;
      return S && Qe(S.toToken) || $.use.token;
    }
    const u = ($) => Ba(Md[$.use.kind]);
    function d($, S) {
      const k = pn(Md[$.use.kind]).find((M) => M.name === S);
      if ($.source?.axis === "css" && $.property) {
        const M = `var(--${$.cssVar ?? ln($.use.token)})`, I = `var(--${ln(k)})`, L = $.use.cls.slice($.property.length + 2);
        vd({
          ...i($),
          componentName: t.value.name,
          file: $.file ?? r().file,
          to: S === $.use.token.name ? $.use.cls : `${$.property}: ${L.replace(M, I)}`,
          fromToken: $.use.token.name,
          toToken: S,
          selector: $.selector,
          css: `${$.property}: ${L.replace(M, I)} !important;`,
          property: $.property
        });
        return;
      }
      vd({
        ...i($),
        componentName: t.value.name,
        file: r().file,
        to: S === $.use.token.name ? $.use.cls : dC($.use, k),
        fromToken: $.use.token.name,
        toToken: S,
        selector: `${$.selector}${$.stateSuffix}`,
        css: uC($.use.kind, k, $.use.opacity)
      });
    }
    const c = q(() => t.value.kit || t.value.match ? ok(r().id) : []), f = q(() => [
      ...new Set(n.value.flatMap(($) => $.rows.map((S) => l(S))).filter(Wn))
    ]), m = q(() => ({ tokens: f.value, swaps: c.value, merges: [] }));
    kt(() => {
      if (!t.value.kit && !t.value.match) return void (dt.value = null);
      const $ = r().id;
      dt.value = {
        label: t.value.name,
        changes: c.value.length + f.value.length,
        scope: m.value,
        revert: c.value.length ? () => rk($) : void 0
      };
    }), an(() => dt.value = null);
    const p = q(() => t.value.kit ? Vp(t.value.kit.name) : null), g = /* @__PURE__ */ B("tokens"), b = q({
      get: () => g.value === "preview" && !s.value ? "tokens" : g.value,
      set: ($) => g.value = $
    }), w = q(() => [
      { value: "tokens", label: "Edit tokens", count: C.value || void 0 },
      ...s.value ? [{ value: "preview", label: "Variants" }] : [],
      { value: "info", label: "Info" }
    ]), x = q(() => t.value.detail?.split(" · ") ?? []), y = q(() => x.value.filter(($) => !$.includes("/"))), v = q(() => x.value.filter(($) => $.includes("/"))), C = q(() => c.value.length + f.value.length), F = ($) => $.source ? $.source.axis === "base" ? `Base · every ${t.value.name.toLowerCase()}` : $.source.axis === "file" ? $.source.option.split("/").pop() : $.source.axis === "css" ? `CSS · ${$.source.option}` : `${$.source.axis} ${$.source.option}` : "Set at the call site or repeated in the file · not swappable";
    return ($, S) => (h(), A("div", XC, [
      T("header", JC, [
        O(Va, {
          class: "dse:absolute dse:top-0 dse:right-0",
          what: t.value.name,
          text: () => a(dm)(t.value.kit?.name ?? t.value.match?.component.name ?? t.value.name, {
            options: t.value.match?.options,
            rows: n.value.flatMap((k) => k.rows)
          })
        }, null, 8, ["what", "text"]),
        T("h3", ZC, R(t.value.name), 1),
        T("p", QC, R([
          ...s.value ? v.value : x.value,
          p.value && `used ${p.value.total}× in ${p.value.files.length} files`
        ].filter(Boolean).join(" · ")), 1)
      ]),
      O(Es, {
        modelValue: b.value,
        "onUpdate:modelValue": S[0] || (S[0] = (k) => b.value = k),
        variant: "contained",
        class: "dse:[&>*]:flex-1",
        options: w.value
      }, null, 8, ["modelValue", "options"]),
      s.value && b.value === "preview" ? (h(), A("section", eS, [
        S[2] || (S[2] = T("p", { class: "dse:text-ui dse:text-subtle-foreground" }, "Preview only. Doesn't change the design system.", -1)),
        (h(!0), A(W, null, pe(s.value.playground.controls, (k) => (h(), D(tC, {
          key: k.key,
          modelValue: a(Gr)[s.value.id][k.key],
          "onUpdate:modelValue": (M) => a(Gr)[s.value.id][k.key] = M,
          control: k
        }, null, 8, ["modelValue", "onUpdate:modelValue", "control"]))), 128))
      ])) : b.value === "info" ? (h(), A(W, { key: 1 }, [
        T("section", null, [
          S[4] || (S[4] = T("h4", { class: "dse:mb-2 dse:text-ui dse:font-semibold" }, "Layout", -1)),
          (h(!0), A(W, null, pe(t.value.layout, (k) => (h(), A("div", {
            key: k.label,
            class: "dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
          }, [
            T("span", tS, R(k.label), 1),
            T("span", nS, R(k.value), 1),
            k.offGrid ? (h(), D(Bt, {
              key: 0,
              variant: "outline",
              size: "sm"
            }, {
              default: E(() => [...S[3] || (S[3] = [
                Q("off grid", -1)
              ])]),
              _: 1
            })) : k.cls ? (h(), A("span", sS, R(k.cls), 1)) : Y("", !0)
          ]))), 128))
        ]),
        p.value ? (h(), D(pm, {
          key: 0,
          usage: p.value,
          noun: "instances"
        }, null, 8, ["usage"])) : Y("", !0)
      ], 64)) : (h(), A(W, { key: 2 }, [
        T("section", null, [
          s.value && y.value.length ? (h(), A("p", oS, [
            (h(!0), A(W, null, pe(y.value, (k) => (h(), D(Bt, {
              key: k,
              size: "md"
            }, {
              default: E(() => [
                Q(R(k), 1)
              ]),
              _: 2
            }, 1024))), 128)),
            O(Te, {
              variant: "link",
              size: "sm",
              class: "dse:ml-auto",
              onClick: S[1] || (S[1] = (k) => b.value = "preview")
            }, {
              default: E(() => [...S[5] || (S[5] = [
                Q("Change", -1)
              ])]),
              _: 1
            })
          ])) : Y("", !0),
          n.value.length ? Y("", !0) : (h(), A("p", rS, " No design tokens on this element. ")),
          (h(!0), A(W, null, pe(n.value, (k) => (h(), A(W, {
            key: k.label
          }, [
            n.value.length > 1 ? (h(), A("p", iS, R(k.label), 1)) : Y("", !0),
            (h(!0), A(W, null, pe(k.rows, (M) => (h(), A("div", {
              key: k.label + M.use.cls,
              class: "dse:flex dse:flex-col dse:gap-2 dse:border-t dse:border-border-default dse:py-3"
            }, [
              T("div", lS, [
                T("span", aS, R(a(sm)[M.use.kind]), 1),
                M.use.states.length ? (h(), D(Bt, {
                  key: 0,
                  size: "sm"
                }, {
                  default: E(() => [
                    Q(R(a(iC)(M.use.states)), 1)
                  ]),
                  _: 2
                }, 1024)) : Y("", !0),
                M.use.opacity ? (h(), A("span", uS, R(M.use.opacity) + "%", 1)) : Y("", !0)
              ]),
              T("div", dS, [
                o(M) ? (h(), A(W, { key: 0 }, [
                  l(M).group === "color" ? (h(), A("span", {
                    key: 0,
                    class: "dse:size-6 dse:shrink-0 dse:rounded-control dse:border dse:border-border-strong",
                    style: Ie({ background: a(le)(l(M)) })
                  }, null, 4)) : Y("", !0),
                  O(xs, {
                    "model-value": l(M).name,
                    size: "sm",
                    class: "dse:min-w-0 dse:flex-1",
                    options: u(M),
                    "onUpdate:modelValue": (I) => d(M, I)
                  }, null, 8, ["model-value", "options", "onUpdate:modelValue"]),
                  O(Te, {
                    variant: "ghost",
                    size: "icon-sm",
                    "aria-label": `Edit ${a(me)(l(M))} everywhere`,
                    title: "Edit this token everywhere",
                    onClick: (I) => a(Rp)(l(M))
                  }, {
                    default: E(() => [
                      O(a(Mg), { size: 14 })
                    ]),
                    _: 1
                  }, 8, ["aria-label", "onClick"])
                ], 64)) : (h(), D(Pt, {
                  key: 1,
                  token: l(M)
                }, null, 8, ["token"]))
              ]),
              T("p", cS, [
                T("span", fS, R(F(M)), 1),
                T("span", null, "used in " + R(a(yt)(l(M)).files.length) + " files", 1)
              ])
            ]))), 128))
          ], 64))), 128))
        ]),
        t.value.hardcoded.length ? (h(), A("section", pS, [
          S[6] || (S[6] = T("h4", { class: "dse:mb-1 dse:text-ui dse:font-semibold" }, "Hardcoded", -1)),
          S[7] || (S[7] = T("p", { class: "dse:mb-2 dse:text-ui dse:text-subtle-foreground" }, " Literal values, not tokens. They can't be tweaked here until they become tokens. ", -1)),
          (h(!0), A(W, null, pe(t.value.hardcoded, (k) => (h(), A("div", {
            key: k.label,
            class: "dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
          }, [
            T("span", mS, R(k.label), 1),
            T("span", hS, R(k.value), 1),
            k.cls ? (h(), A("span", gS, R(k.cls), 1)) : Y("", !0)
          ]))), 128))
        ])) : Y("", !0)
      ], 64))
    ]));
  }
}), yS = ["aria-expanded", "onClick"], bS = { class: "dse:flex-1" }, xS = { class: "dse:text-ui dse:text-subtle-foreground" }, wS = {
  key: 0,
  class: "dse:flex dse:flex-col dse:gap-1 dse:pb-3"
}, kS = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground" }, _S = { class: "dse:w-10 dse:shrink-0 dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground dse:tabular-nums" }, CS = /* @__PURE__ */ V({
  __name: "TokenBrowser",
  setup(e) {
    const t = Yo.map((o) => ({ group: o.ns.id, label: o.ns.label })), n = /* @__PURE__ */ B(/* @__PURE__ */ new Set(["color"]));
    function s(o) {
      const r = new Set(n.value);
      r.has(o) ? r.delete(o) : r.add(o), n.value = r;
    }
    return (o, r) => (h(!0), A(W, null, pe(a(t), (i) => (h(), A("div", {
      key: i.group,
      class: "dse:border-b dse:border-border-default"
    }, [
      T("button", {
        type: "button",
        class: "dse:flex dse:h-10 dse:w-full dse:items-center dse:gap-2 dse:text-left dse:text-ui dse:font-medium dse:outline-none dse:focus-visible:text-base-foreground",
        "aria-expanded": n.value.has(i.group),
        onClick: (l) => s(i.group)
      }, [
        T("span", bS, R(i.label), 1),
        T("span", xS, R(a(pn)(i.group).length), 1),
        O(a(ta), {
          size: 14,
          class: Ee(
            a(st)("dse:text-subtle-foreground dse:transition-transform", n.value.has(i.group) && "dse:rotate-180")
          )
        }, null, 8, ["class"])
      ], 8, yS),
      n.value.has(i.group) ? (h(), A("div", wS, [
        (h(!0), A(W, null, pe(a(pn)(i.group), (l) => (h(), A("div", {
          key: l.name,
          class: "dse:flex dse:items-center dse:gap-2"
        }, [
          O(Pt, {
            token: l,
            class: "dse:max-w-44"
          }, null, 8, ["token"]),
          T("span", kS, R(a(le)(l)), 1),
          T("span", _S, R(a(yt)(l).total) + "×", 1)
        ]))), 128))
      ])) : Y("", !0)
    ]))), 128));
  }
}), SS = { class: "dse:flex dse:flex-col dse:gap-3" }, $S = { class: "dse:flex dse:h-10 dse:overflow-hidden dse:rounded-control dse:border dse:border-border-strong" }, ES = ["title"], TS = ["title"], AS = { class: "dse:flex dse:items-center dse:justify-between dse:text-ui" }, PS = { class: "dse:text-muted-foreground" }, OS = { class: "dse:font-mono dse:text-subtle-foreground dse:tabular-nums" }, MS = {
  key: 0,
  class: "dse:flex dse:items-center dse:gap-2"
}, qS = { class: "dse:flex-1 dse:text-ui dse:text-muted-foreground" }, IS = /* @__PURE__ */ V({
  __name: "OklchControl",
  props: {
    token: {}
  },
  setup(e) {
    const t = q({
      get: () => le(e.token),
      set: (c) => {
        const f = hs(c);
        Co(e.token, f ? ao(f) : c);
      }
    }), n = (c) => he.tokens[c], s = q(() => hs(Fo(t.value, n))), o = q(() => hs(Fo(eo(e.token)))), r = (c) => Co(e.token, ao({ ...s.value, ...c })), i = q(() => !s.value || Ra(s.value)), l = q(() => s.value ? Xp(s.value.l, s.value.h) : 0.4), u = (c) => ao(c), d = q(() => {
      const c = s.value, f = Math.max(c.c, 0.1);
      return [
        {
          key: "l",
          label: "Lightness",
          max: 1,
          step: 1e-3,
          show: c.l.toFixed(3),
          track: `linear-gradient(to right in oklch, ${u({ ...c, l: 0, alpha: 1 })}, ${u({ ...c, l: 1, alpha: 1 })})`
        },
        {
          key: "c",
          label: "Chroma",
          max: 0.4,
          step: 1e-3,
          show: c.c.toFixed(3),
          track: `linear-gradient(to right in oklch, ${u({ ...c, c: 0, alpha: 1 })}, ${u({ ...c, c: 0.4, alpha: 1 })})`
        },
        {
          key: "h",
          label: "Hue",
          max: 360,
          step: 0.5,
          show: `${c.h.toFixed(1)}°`,
          track: `linear-gradient(to right in oklch longer hue, ${u({ ...c, c: f, h: 0, alpha: 1 })}, ${u({ ...c, c: f, h: 359.9, alpha: 1 })})`
        },
        {
          key: "alpha",
          label: "Alpha",
          max: 1,
          step: 0.01,
          show: c.alpha.toFixed(2),
          track: `linear-gradient(to right, ${u({ ...c, alpha: 0 })}, ${u({ ...c, alpha: 1 })})`
        }
      ];
    });
    return (c, f) => (h(), A("div", SS, [
      T("div", $S, [
        T("span", {
          class: "dse:flex dse:flex-1 dse:items-end dse:p-1.5 dse:text-ui dse:text-muted-foreground",
          style: Ie({ background: e.token.value }),
          title: `Before: ${o.value ? a(ao)(o.value) : e.token.value}`
        }, [...f[2] || (f[2] = [
          T("span", { class: "dse:rounded-min dse:bg-media-overlay dse:px-1" }, "before", -1)
        ])], 12, ES),
        T("span", {
          class: "dse:flex dse:flex-1 dse:items-end dse:justify-end dse:p-1.5 dse:text-ui dse:text-muted-foreground",
          style: Ie({ background: t.value }),
          title: `Now: ${t.value}`
        }, [...f[3] || (f[3] = [
          T("span", { class: "dse:rounded-min dse:bg-media-overlay dse:px-1" }, "now", -1)
        ])], 12, TS)
      ]),
      O(Na, {
        modelValue: t.value,
        "onUpdate:modelValue": f[0] || (f[0] = (m) => t.value = m),
        size: "sm",
        mono: "",
        "aria-label": `${a(me)(e.token)} value`
      }, null, 8, ["modelValue", "aria-label"]),
      s.value ? (h(), A(W, { key: 0 }, [
        (h(!0), A(W, null, pe(d.value, (m) => (h(), A("div", {
          key: m.key,
          class: "dse:flex dse:flex-col dse:gap-1"
        }, [
          T("div", AS, [
            T("span", PS, R(m.label), 1),
            T("span", OS, [
              Q(R(m.show), 1),
              m.key === "c" ? (h(), A(W, { key: 0 }, [
                Q(" · max " + R(l.value.toFixed(3)), 1)
              ], 64)) : Y("", !0)
            ])
          ]),
          O(a(Uf), {
            "model-value": [s.value[m.key]],
            min: 0,
            max: m.max,
            step: m.step,
            class: "dse:relative dse:flex dse:h-4 dse:touch-none dse:items-center dse:select-none",
            "onUpdate:modelValue": (p) => p && r({ [m.key]: p[0] })
          }, {
            default: E(() => [
              O(a(Yf), {
                class: "dse:relative dse:h-2 dse:grow dse:rounded-full dse:ring-1 dse:ring-border-default dse:ring-inset",
                style: Ie({ background: m.track })
              }, null, 8, ["style"]),
              O(a(Gf), {
                "aria-label": `${a(me)(e.token)} ${m.label}`,
                class: "dse:block dse:size-3.5 dse:rounded-full dse:border-2 dse:border-base-foreground dse:bg-card-background dse:shadow-popover dse:outline-none dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
              }, null, 8, ["aria-label"])
            ]),
            _: 2
          }, 1032, ["model-value", "max", "step", "onUpdate:modelValue"])
        ]))), 128)),
        i.value ? Y("", !0) : (h(), A("div", MS, [
          O(Bt, { variant: "outline" }, {
            default: E(() => [...f[4] || (f[4] = [
              Q("outside sRGB", -1)
            ])]),
            _: 1
          }),
          T("span", qS, "Chroma is above " + R(l.value.toFixed(3)) + " for this lightness and hue; screens clip it.", 1),
          O(Te, {
            size: "sm",
            onClick: f[1] || (f[1] = (m) => a(Co)(e.token, a(ao)(a(Nk)(s.value))))
          }, {
            default: E(() => [...f[5] || (f[5] = [
              Q("Fit to sRGB", -1)
            ])]),
            _: 1
          })
        ]))
      ], 64)) : Y("", !0)
    ]));
  }
}), RS = { class: "dse:flex dse:flex-col dse:gap-2 dse:py-2" }, DS = { class: "dse:flex dse:h-6 dse:items-center dse:gap-2" }, FS = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui dse:text-muted-foreground" }, BS = /* @__PURE__ */ V({
  __name: "TokenControl",
  props: {
    token: {}
  },
  setup(e) {
    const t = q({
      get: () => le(e.token),
      set: (u) => Co(e.token, u)
    }), n = (u, d) => Array.from({ length: (d - u) / 4 + 1 }, (c, f) => `${u + f * 4}px`), s = n(0, 24).map((u) => ({ value: u, label: u.replace("px", "") })), o = n(12, 48).map((u) => ({ value: u, label: u })), r = n(0, 48).map((u) => ({ value: u, label: u })), i = (u) => u.some((d) => d.value === t.value) ? u : [{ value: t.value, label: `${t.value} (off grid)` }, ...u], l = q(() => $p.includes(e.token.group) && !Ep(t.value));
    return (u, d) => (h(), A("div", RS, [
      T("div", DS, [
        T("span", FS, R(a(me)(e.token)), 1),
        l.value ? (h(), D(Bt, {
          key: 0,
          variant: "outline",
          size: "sm"
        }, {
          default: E(() => [...d[5] || (d[5] = [
            Q("off grid", -1)
          ])]),
          _: 1
        })) : Y("", !0),
        a(Wn)(e.token) ? (h(), D(Te, {
          key: 1,
          variant: "ghost",
          size: "icon-xs",
          "aria-label": `Reset ${a(me)(e.token)}`,
          onClick: d[0] || (d[0] = (c) => a(Ap)(e.token))
        }, {
          default: E(() => [
            O(a(rf), { size: 12 })
          ]),
          _: 1
        }, 8, ["aria-label"])) : Y("", !0)
      ]),
      e.token.group === "radius" ? (h(), D(Es, {
        key: 0,
        modelValue: t.value,
        "onUpdate:modelValue": d[1] || (d[1] = (c) => t.value = c),
        size: "sm",
        variant: "contained",
        options: i(a(s))
      }, null, 8, ["modelValue", "options"])) : e.token.group === "leading" ? (h(), D(xs, {
        key: 1,
        modelValue: t.value,
        "onUpdate:modelValue": d[2] || (d[2] = (c) => t.value = c),
        size: "sm",
        options: i(a(o))
      }, null, 8, ["modelValue", "options"])) : e.token.group === "blur" ? (h(), D(xs, {
        key: 2,
        modelValue: t.value,
        "onUpdate:modelValue": d[3] || (d[3] = (c) => t.value = c),
        size: "sm",
        options: i(a(r))
      }, null, 8, ["modelValue", "options"])) : e.token.group === "color" ? (h(), D(IS, {
        key: 3,
        token: e.token
      }, null, 8, ["token"])) : (h(), D(Na, {
        key: 4,
        modelValue: t.value,
        "onUpdate:modelValue": d[4] || (d[4] = (c) => t.value = c),
        size: "sm",
        mono: "",
        "aria-label": a(me)(e.token)
      }, null, 8, ["modelValue", "aria-label"]))
    ]));
  }
}), NS = { class: "dse:flex dse:flex-col dse:gap-6" }, VS = { class: "dse:relative dse:pr-8" }, LS = { class: "dse:font-mono dse:text-ui dse:font-semibold dse:break-all" }, zS = { class: "dse:mt-0.5 dse:truncate dse:text-ui dse:text-subtle-foreground" }, jS = {
  key: 0,
  class: "dse:flex dse:flex-col dse:gap-3"
}, KS = {
  key: 1,
  class: "dse:text-ui dse:text-subtle-foreground"
}, HS = { class: "dse:text-ui dse:text-subtle-foreground" }, US = {
  key: 1,
  class: "dse:flex dse:flex-col dse:gap-3"
}, WS = { class: "dse:text-ui dse:text-subtle-foreground" }, GS = { class: "dse:flex dse:flex-col" }, YS = { class: "dse:w-20 dse:shrink-0 dse:text-muted-foreground" }, XS = { class: "dse:min-w-0 dse:flex-1 dse:font-mono dse:break-all" }, JS = /* @__PURE__ */ V({
  __name: "TokenInspector",
  props: {
    token: {}
  },
  setup(e) {
    const t = q(() => yt(e.token)), n = q(() => Gn(e.token)), s = q(() => Wn(e.token) || !!n.value), o = q(
      () => Ba(e.token.group).filter((m) => m.value !== e.token.name && !he.merges[m.value])
    ), r = q(() => ({
      tokens: Wn(e.token) ? [e.token] : [],
      swaps: [],
      merges: n.value ? [[e.token.name, n.value]] : []
    }));
    kt(() => {
      dt.value = {
        label: me(e.token),
        changes: s.value ? 1 : 0,
        scope: r.value,
        revert: s.value ? () => Mp(e.token) : void 0
      };
    }), an(() => dt.value = null);
    const i = PC, l = q(() => !e.token.parent), u = q({
      get: () => i.value === "merge" && !l.value ? "edit" : i.value,
      set: (m) => i.value = m
    }), d = q(() => [
      { value: "edit", label: "Edit token", count: Wn(e.token) ? 1 : void 0 },
      ...l.value ? [{ value: "merge", label: "Merge", count: n.value ? 1 : void 0 }] : [],
      { value: "info", label: "Info" }
    ]), c = q(() => ["color", "text", "radius", "shadow"].includes(e.token.group)), f = q(() => {
      const m = Hn(e.token.parent ?? e.token.name);
      return [
        { label: "Value", value: e.token.value },
        { label: "Declared", value: cm(e.token)?.split(" → ")[0] ?? "—" },
        { label: "Namespace", value: `--${m.prefix}*` },
        {
          label: "Use as",
          value: [...fm(e.token), `var(--${ln(e.token)})`].join(", ")
        },
        ...e.token.parent ? [{ label: "Carried by", value: `--${e.token.parent}` }] : []
      ];
    });
    return (m, p) => (h(), A("div", NS, [
      T("header", VS, [
        O(Va, {
          class: "dse:absolute dse:top-0 dse:right-0",
          what: `--${e.token.name}`,
          text: () => a(IC)(e.token)
        }, null, 8, ["what", "text"]),
        T("h3", LS, "--" + R(e.token.name), 1),
        T("p", zS, R(a(zr)(e.token.group)) + " · used " + R(t.value.total) + "× in " + R(t.value.files.length) + " files ", 1)
      ]),
      O(Es, {
        modelValue: u.value,
        "onUpdate:modelValue": p[0] || (p[0] = (g) => u.value = g),
        variant: "contained",
        class: "dse:[&>*]:flex-1",
        options: d.value
      }, null, 8, ["modelValue", "options"]),
      u.value === "edit" ? (h(), A("section", jS, [
        n.value ? (h(), A("p", KS, [
          Q(" Merging into " + R(a(me)(a(Qe)(n.value))) + ": its value no longer applies. ", 1),
          O(Te, {
            variant: "link",
            size: "sm",
            onClick: p[1] || (p[1] = (g) => u.value = "merge")
          }, {
            default: E(() => [...p[4] || (p[4] = [
              Q("See merge", -1)
            ])]),
            _: 1
          })
        ])) : (h(), D(BS, {
          key: 0,
          token: e.token
        }, null, 8, ["token"])),
        T("p", HS, [
          Q(" Changes it in all " + R(t.value.total) + " places. ", 1),
          e.token.parent ? (h(), A(W, { key: 0 }, [
            Q("Travels with --" + R(e.token.parent) + ", wherever that is used.", 1)
          ], 64)) : Y("", !0)
        ])
      ])) : u.value === "merge" ? (h(), A("section", US, [
        O(xs, {
          "model-value": n.value ?? "",
          size: "sm",
          label: "Merge into",
          options: o.value,
          "onUpdate:modelValue": p[2] || (p[2] = (g) => a(Op)(e.token, a(Qe)(g) ?? null))
        }, null, 8, ["model-value", "options"]),
        T("p", WS, R(n.value ? `All ${t.value.total} uses switch to ${a(me)(a(Qe)(n.value))}, and ${a(me)(e.token)} is deleted (in the llm.txt).` : "Replaces every use with another token, then deletes this one."), 1),
        c.value ? (h(), D(Te, {
          key: 0,
          size: "sm",
          class: "dse:self-start",
          onClick: p[3] || (p[3] = (g) => a(nm)(e.token.group))
        }, {
          default: E(() => [
            O(a(na), { size: 13 }),
            Q("Consolidate all " + R(a(zr)(e.token.group).toLowerCase()), 1)
          ]),
          _: 1
        })) : Y("", !0)
      ])) : (h(), A(W, { key: 2 }, [
        T("section", GS, [
          (h(!0), A(W, null, pe(f.value, (g) => (h(), A("div", {
            key: g.label,
            class: "dse:flex dse:items-start dse:gap-2 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
          }, [
            T("span", YS, R(g.label), 1),
            T("span", XS, R(g.value), 1)
          ]))), 128))
        ]),
        O(pm, { usage: t.value }, null, 8, ["usage"])
      ], 64))
    ]));
  }
}), ZS = {
  class: "dse:flex dse:w-88 dse:shrink-0 dse:flex-col dse:border-l dse:border-border-default dse:bg-card-background",
  "aria-label": "Inspector"
}, QS = { class: "dse:flex dse:h-12 dse:shrink-0 dse:items-center dse:gap-2 dse:border-b dse:border-border-default dse:px-4" }, e$ = { class: "dse:flex dse:flex-1 dse:items-center dse:gap-2 dse:text-ui dse:font-semibold" }, t$ = { class: "dse:min-h-0 dse:flex-1 dse:overflow-y-auto dse:p-4 dse:[scrollbar-width:thin]" }, n$ = {
  key: 0,
  class: "dse:mb-6"
}, s$ = {
  key: 0,
  class: "dse:flex dse:gap-2 dse:border-t dse:border-border-default dse:p-4"
}, o$ = {
  key: 1,
  class: "dse:flex dse:flex-col dse:gap-2 dse:border-t dse:border-border-default dse:p-4"
}, r$ = { class: "dse:truncate dse:text-ui dse:text-subtle-foreground" }, i$ = { class: "dse:flex dse:gap-2 dse:[&>*:first-child]:flex-1" }, l$ = {
  key: 2,
  class: "dse:flex dse:gap-2 dse:border-t dse:border-border-default dse:p-4"
}, a$ = /* @__PURE__ */ V({
  __name: "Inspector",
  setup(e) {
    function t() {
      const n = e_();
      ht.value = null, zs(`Added ${n} ${n === 1 ? "change" : "changes"} to the draft`);
    }
    return (n, s) => (h(), A("aside", ZS, [
      T("header", QS, [
        a(ht) && !a(Se) ? (h(), D(Te, {
          key: 0,
          variant: "ghost",
          size: "icon-xs",
          "aria-label": a(ht).kind === "token" && a(Je) ? `Back to ${a(Je).label}` : "Back to overview",
          onClick: a(uk)
        }, {
          default: E(() => [
            O(a(Og), { size: 14 })
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])) : Y("", !0),
        T("h2", e$, [
          a(Se) ? (h(), A(W, { key: 0 }, [
            s[1] || (s[1] = T("span", { class: "dse:size-1.5 dse:rounded-full dse:bg-accent" }, null, -1)),
            Q("Consolidate " + R(a($o)), 1)
          ], 64)) : a(Je) ? (h(), A(W, { key: 1 }, [
            s[2] || (s[2] = T("span", { class: "dse:size-1.5 dse:rounded-full dse:bg-accent" }, null, -1)),
            Q("Editing " + R(a(Je).label), 1)
          ], 64)) : (h(), A(W, { key: 2 }, [
            Q("Inspector")
          ], 64))
        ]),
        a(At) ? (h(), D(Bt, {
          key: 1,
          size: "sm"
        }, {
          default: E(() => [
            Q(R(a(At)) + " in draft", 1)
          ]),
          _: 1
        })) : Y("", !0)
      ]),
      T("div", t$, [
        a(Se) ? (h(), D(Z_, { key: 0 })) : a(ht)?.kind === "token" ? (h(), D(JS, {
          key: a(ht).token.name,
          token: a(ht).token
        }, null, 8, ["token"])) : a(ht)?.kind === "element" ? (h(), D(vS, {
          key: 2,
          el: a(ht).el
        }, null, 8, ["el"])) : (h(), A(W, { key: 3 }, [
          s[4] || (s[4] = T("p", { class: "dse:mb-4 dse:text-ui dse:text-muted-foreground" }, " Click a component or a token to edit it. Changes stay in a draft; copy them as llm.txt for your coding agent. ", -1)),
          a(At) ? (h(), A("section", n$, [
            s[3] || (s[3] = T("h3", { class: "dse:mb-1 dse:text-ui dse:font-semibold" }, "Draft", -1)),
            O(Dp)
          ])) : Y("", !0),
          s[5] || (s[5] = T("h3", { class: "dse:mb-1 dse:text-ui dse:font-semibold" }, "Tokens", -1)),
          O(CS)
        ], 64))
      ]),
      a(Se) ? (h(), A("footer", s$, [
        O(Te, { onClick: a(Hr) }, {
          default: E(() => [...s[6] || (s[6] = [
            Q("Cancel", -1)
          ])]),
          _: 1
        }, 8, ["onClick"]),
        O(Te, {
          variant: "primary",
          class: "dse:flex-1",
          disabled: !a(Ln),
          onClick: t
        }, {
          default: E(() => [
            O(a(of), { size: 13 }),
            Q("Add " + R(a(Ln)) + " " + R(a(Ln) === 1 ? "change" : "changes") + " to draft", 1)
          ]),
          _: 1
        }, 8, ["disabled"])
      ])) : a(dt) ? (h(), A("footer", o$, [
        T("p", r$, R(a(dt)?.changes ? `${a(dt)?.changes} ${a(dt)?.changes === 1 ? "change" : "changes"} to ${a(dt)?.label}` : `No changes to ${a(dt)?.label} yet`), 1),
        T("div", i$, [
          O(Od, {
            scope: a(dt)?.scope,
            disabled: !a(dt)?.changes
          }, null, 8, ["scope", "disabled"]),
          O(Nr, {
            wrap: "",
            content: a(dt)?.revert ? `Undoes only ${a(dt)?.label}'s changes. Everything else stays in the draft.` : `${a(dt)?.label} has no changes of its own to undo.`
          }, {
            default: E(() => [
              O(Te, {
                size: "sm",
                disabled: !a(dt)?.revert,
                onClick: s[0] || (s[0] = (o) => a(dt)?.revert?.())
              }, {
                default: E(() => [
                  O(a(xl), { size: 13 }),
                  Q("Revert " + R(a(dt)?.label), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          }, 8, ["content"])
        ])
      ])) : a(At) ? (h(), A("footer", l$, [
        O(Od, {
          label: "Copy the whole draft as llm.txt",
          class: "dse:flex-1"
        })
      ])) : Y("", !0)
    ]));
  }
}), u$ = /* @__PURE__ */ V({
  __name: "DropdownMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    memoDependencies: {},
    side: {},
    sideOffset: { default: 6 },
    sideFlip: { type: Boolean },
    align: {},
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    hideShiftedArrow: { type: Boolean },
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(e) {
    const t = Ic(e, ["class", "sideOffset"]), n = Ys(t);
    return (s, o) => (h(), D(a(Kx), {
      to: a(Ei),
      defer: ""
    }, {
      default: E(() => [
        O(a(Vx), ue(a(n), {
          "side-offset": e.sideOffset,
          class: a(st)(a(Hp), "dse:min-w-56", e.class)
        }), {
          default: E(() => [
            G(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["side-offset", "class"])
      ]),
      _: 3
    }, 8, ["to"]));
  }
}), d$ = /* @__PURE__ */ V({
  __name: "DropdownMenuItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = Ic(e, ["class"]), s = t, o = Ys(n);
    return (r, i) => (h(), D(a(zx), ue(a(o), {
      class: a(st)(a(Up), e.class),
      onSelect: i[0] || (i[0] = (l) => s("select", l))
    }), {
      default: E(() => [
        G(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), c$ = { class: "dse:flex-1 dse:truncate" }, f$ = {
  key: 1,
  class: "dse:max-w-28 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
}, p$ = /* @__PURE__ */ V({
  __name: "TargetItem",
  props: {
    target: {}
  },
  emits: ["select"],
  setup(e) {
    return (t, n) => (h(), D(d$, {
      onSelect: n[0] || (n[0] = (s) => t.$emit("select"))
    }, {
      default: E(() => [
        e.target.token?.group === "color" ? (h(), A("span", {
          key: 0,
          class: "dse:size-3 dse:shrink-0 dse:rounded-min dse:border dse:border-border-strong",
          style: Ie({ background: a(le)(e.target.token) })
        }, null, 4)) : Y("", !0),
        T("span", c$, R(e.target.label), 1),
        e.target.token ? (h(), A("span", f$, R(a(le)(e.target.token)), 1)) : Y("", !0)
      ]),
      _: 1
    }));
  }
}), m$ = ["id"], h$ = { class: "dse:flex dse:items-start dse:gap-4" }, g$ = { class: "dse:min-w-0 dse:flex-1" }, v$ = { class: "dse:flex dse:items-center dse:gap-1 dse:text-heading dse:font-semibold" }, y$ = {
  key: 0,
  class: "dse:mt-1 dse:max-w-xl dse:text-ui dse:text-muted-foreground"
}, b$ = {
  key: 0,
  class: "dse:flex dse:items-center dse:gap-2"
}, x$ = {
  key: 1,
  class: "dse:flex dse:items-center dse:gap-2"
}, w$ = {
  type: "button",
  class: "dse:flex dse:h-7 dse:items-center dse:gap-2 dse:rounded-full dse:bg-accent/15 dse:px-3 dse:text-ui dse:outline-none dse:hover:bg-accent/25 dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
}, k$ = {
  key: 1,
  class: "dse:flex dse:h-7 dse:items-center dse:gap-2 dse:rounded-full dse:bg-accent/15 dse:px-3 dse:text-ui"
}, _$ = {
  key: 2,
  class: "dse:flex dse:items-center dse:gap-1"
}, xr = /* @__PURE__ */ V({
  __name: "GallerySection",
  props: {
    id: {},
    title: {},
    description: {},
    playground: {},
    components: { default: () => [] },
    tokens: { default: () => [] },
    consolidate: {}
  },
  setup(e) {
    const t = q(() => !!e.consolidate && Se.value?.group === e.consolidate), n = q(() => Je.value?.section === e.id || t.value), s = q(() => !n.value && (!!Je.value || !!Se.value)), o = q(
      () => e.playground ? [{ component: null, label: e.playground }] : e.tokens.length ? e.tokens.map((f) => ({ component: null, label: me(f), token: f })) : e.components.map((f) => ({ component: f, label: f }))
    ), r = /* @__PURE__ */ B();
    function i() {
      if (e.tokens.length) return RC(e.tokens[0].group);
      const f = /* @__PURE__ */ new Set([...e.playground ? [e.playground] : [], ...e.components]);
      for (const m of r.value?.querySelectorAll(":scope > :not(header) *") ?? []) {
        const p = Wr(m);
        p && f.add(p.name);
      }
      return f.size ? [...f].map((m) => dm(m)).join(`

---

`) : `# ${e.title}

${e.description ?? ""}`;
    }
    const l = q(
      () => !n.value && !Se.value && !e.tokens.length && o.value.length > 0
    );
    function u(f) {
      for (let m = f; m && m !== r.value; m = m.parentElement) {
        const p = Wr(m), g = p && o.value.find((b) => b.component === p.name);
        if (g) return g;
      }
      return o.value[0];
    }
    function d(f) {
      if (n.value && f.type === "click" && o.value.length > 1) {
        const m = u(f.target);
        m.component !== Je.value?.component && c(m);
        return;
      }
      l.value && (f instanceof KeyboardEvent && f.key !== "Enter" && f.key !== " " || (f.preventDefault(), f.stopPropagation(), (f.type === "click" || f instanceof KeyboardEvent) && c(u(f.target))));
    }
    function c(f) {
      Hr(), Ma({ section: e.id, component: f.component, label: f.label, token: f.token?.name });
    }
    return (f, m) => (h(), A("section", {
      id: e.id,
      ref_key: "root",
      ref: r,
      class: Ee(
        a(st)(
          a(jp)({ padding: "lg" }),
          "dse:flex dse:scroll-mt-6 dse:flex-col dse:gap-6 dse:transition-[opacity,box-shadow] dse:duration-200",
          n.value && "dse:ring-2 dse:ring-accent",
          s.value && "dse:opacity-40 dse:hover:opacity-100",
          l.value && "dse:cursor-pointer dse:hover:ring-1 dse:hover:ring-border-strong dse:[&_*]:cursor-pointer!"
        )
      )
    }, [
      T("header", h$, [
        T("div", g$, [
          T("h2", v$, [
            Q(R(e.title) + " ", 1),
            O(Va, {
              what: e.title,
              text: i
            }, null, 8, ["what"])
          ]),
          e.description ? (h(), A("p", y$, R(e.description), 1)) : Y("", !0)
        ]),
        t.value ? (h(), A("div", b$, [
          m[2] || (m[2] = T("span", { class: "dse:flex dse:h-7 dse:items-center dse:gap-2 dse:rounded-full dse:bg-accent/15 dse:px-3 dse:text-ui" }, [
            T("span", { class: "dse:size-1.5 dse:rounded-full dse:bg-accent" }),
            Q("Consolidating "),
            T("span", { class: "dse:text-ui dse:text-muted-foreground" }, "· click tokens to merge by hand")
          ], -1)),
          O(Te, {
            variant: "ghost",
            size: "sm",
            onClick: a(Hr)
          }, {
            default: E(() => [
              O(a(Kn), { size: 13 }),
              m[1] || (m[1] = Q("Cancel", -1))
            ]),
            _: 1
          }, 8, ["onClick"])
        ])) : n.value ? (h(), A("div", x$, [
          o.value.length > 1 ? (h(), D(a(Bx), {
            key: 0,
            modal: !1
          }, {
            default: E(() => [
              O(a(Ux), { "as-child": "" }, {
                default: E(() => [
                  T("button", w$, [
                    m[3] || (m[3] = T("span", { class: "dse:size-1.5 dse:rounded-full dse:bg-accent" }, null, -1)),
                    Q("Editing " + R(a(Je).label), 1),
                    O(a(ta), { size: 12 })
                  ])
                ]),
                _: 1
              }),
              O(u$, {
                align: "end",
                class: "dse:min-w-52"
              }, {
                default: E(() => [
                  (h(!0), A(W, null, pe(o.value, (p) => (h(), D(p$, {
                    key: p.label,
                    target: p,
                    onSelect: (g) => c(p)
                  }, null, 8, ["target", "onSelect"]))), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : (h(), A("span", k$, [
            m[4] || (m[4] = T("span", { class: "dse:size-1.5 dse:rounded-full dse:bg-accent" }, null, -1)),
            Q("Editing " + R(a(Je).label), 1)
          ])),
          O(Te, {
            size: "sm",
            onClick: a(Ai)
          }, {
            default: E(() => [
              O(a(ms), { size: 13 }),
              m[5] || (m[5] = Q("Done", -1))
            ]),
            _: 1
          }, 8, ["onClick"])
        ])) : (h(), A("div", _$, [
          e.consolidate ? (h(), D(Te, {
            key: 0,
            variant: "ghost",
            size: "sm",
            onClick: m[0] || (m[0] = (p) => a(nm)(e.consolidate))
          }, {
            default: E(() => [
              O(a(na), { size: 13 }),
              m[6] || (m[6] = Q("Consolidate", -1))
            ]),
            _: 1
          })) : Y("", !0)
        ]))
      ]),
      T("div", {
        class: "dse:flex dse:flex-col dse:gap-6",
        onPointerdownCapture: d,
        onMousedownCapture: d,
        onClickCapture: d,
        onKeydownCapture: d
      }, [
        G(f.$slots, "default")
      ], 32)
    ], 10, m$));
  }
}), C$ = {
  key: 0,
  class: "dse:font-mono dse:text-ui dse:text-status-danger"
}, La = /* @__PURE__ */ V({
  __name: "HostMount",
  props: {
    spec: {}
  },
  setup(e) {
    const t = /* @__PURE__ */ B(), n = /* @__PURE__ */ B("");
    let s = null;
    return Ke(() => {
      try {
        s = Qn.adapter.mount(t.value, e.spec);
      } catch (o) {
        n.value = o instanceof Error ? o.message : String(o);
      }
    }), ve(
      () => e.spec,
      (o) => s?.update(o)
    ), an(() => s?.unmount()), (o, r) => (h(), A(W, null, [
      T("div", {
        ref_key: "el",
        ref: t,
        "data-dse-mount": "",
        class: Ee(["dse:contents", a(_e).scopeClass])
      }, null, 2),
      n.value ? (h(), A("p", C$, R(n.value), 1)) : Y("", !0)
    ], 64));
  }
}), S$ = ["data-dse-component"], $$ = {
  key: 0,
  class: "dse:truncate dse:border-t dse:border-border-default dse:px-3 dse:py-1.5 dse:font-mono dse:text-ui dse:text-muted-foreground"
}, E$ = /* @__PURE__ */ V({
  __name: "Specimen",
  props: {
    item: {}
  },
  setup(e) {
    return (t, n) => (h(), A("figure", {
      class: Ee(
        a(st)(
          "dse:flex dse:min-w-0 dse:flex-col dse:overflow-hidden dse:rounded-control dse:border dse:border-border-default",
          e.item.span === 2 && "dse:col-span-2",
          e.item.span === "full" && "dse:col-span-full"
        )
      ),
      "data-dse-component": e.item.name
    }, [
      T("div", {
        class: Ee(
          a(st)(
            "dse:relative dse:flex dse:min-h-20 dse:flex-1 dse:items-center dse:justify-center",
            !e.item.bleed && "dse:p-4",
            e.item.fill && "dse:[&_[data-dse-mount]>*]:w-full",
            // A transform makes the cell the containing block of `fixed` content.
            e.item.contain && "dse:min-h-40 dse:transform-gpu"
          )
        ),
        style: Ie(a(Qn).surface ? { background: a(Qn).surface } : void 0)
      }, [
        O(La, { spec: e.item }, null, 8, ["spec"])
      ], 6),
      e.item.label ? (h(), A("figcaption", $$, R(e.item.label), 1)) : Y("", !0)
    ], 10, S$));
  }
}), T$ = /* @__PURE__ */ V({
  __name: "Stage",
  props: {
    section: {}
  },
  setup(e) {
    const t = q(() => LC(e.section));
    return (n, s) => (h(), D(Vn, {
      variant: "inset",
      padding: "lg",
      class: "dse:flex dse:min-h-32 dse:items-center dse:justify-center",
      "data-playground": "",
      style: Ie(a(Qn).surface ? { background: a(Qn).surface } : void 0),
      "data-dse-component": e.section.playgroundName
    }, {
      default: E(() => [
        s[0] || (s[0] = T("span", { class: "dse:absolute dse:top-2.5 dse:left-3 dse:text-ui dse:text-subtle-foreground" }, "Playground", -1)),
        O(La, { spec: t.value }, null, 8, ["spec"])
      ]),
      _: 1
    }, 8, ["style", "data-dse-component"]));
  }
}), A$ = { class: "dse:flex dse:flex-col dse:gap-3" }, P$ = { class: "dse:flex dse:flex-wrap dse:items-baseline dse:gap-x-2 dse:gap-y-1" }, O$ = { class: "dse:text-ui dse:font-medium" }, M$ = {
  key: 0,
  class: "dse:rounded-min dse:bg-secondary-background dse:px-1.5 dse:font-mono dse:text-ui dse:text-muted-foreground"
}, q$ = {
  key: 1,
  class: "dse:text-ui dse:text-subtle-foreground"
}, I$ = /* @__PURE__ */ V({
  __name: "VariantGroup",
  props: {
    title: {},
    prop: {},
    note: {},
    cell: { default: "sm" }
  },
  setup(e) {
    const t = {
      sm: "dse:grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]",
      md: "dse:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]",
      lg: "dse:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]"
    };
    return (n, s) => (h(), A("section", A$, [
      T("header", P$, [
        T("h3", O$, R(e.title), 1),
        e.prop ? (h(), A("code", M$, R(e.prop), 1)) : Y("", !0),
        e.note ? (h(), A("p", q$, R(e.note), 1)) : Y("", !0)
      ]),
      T("div", {
        class: Ee(["dse:grid dse:gap-3", t[e.cell]])
      }, [
        G(n.$slots, "default")
      ], 2)
    ]));
  }
}), R$ = {
  key: 1,
  class: "dse:flex dse:flex-col dse:gap-4"
}, D$ = {
  key: 0,
  class: "dse:text-ui dse:text-muted-foreground"
}, F$ = /* @__PURE__ */ V({
  __name: "Components",
  setup(e) {
    return (t, n) => (h(), A(W, null, [
      (h(!0), A(W, null, pe(a(Vo), (s) => (h(), D(xr, {
        id: s.id,
        key: s.id,
        title: s.title,
        description: s.description,
        components: s.names,
        playground: s.playground ? s.playgroundName ?? s.title : void 0
      }, {
        default: E(() => [
          s.playground ? (h(), D(T$, {
            key: 0,
            section: s
          }, null, 8, ["section"])) : Y("", !0),
          (h(!0), A(W, null, pe(s.groups, (o) => (h(), D(I$, {
            key: o.title + (o.prop ?? ""),
            title: o.title,
            prop: o.prop,
            note: o.note,
            cell: o.cell
          }, {
            default: E(() => [
              (h(!0), A(W, null, pe(o.items, (r) => (h(), D(E$, {
                key: r.label,
                item: r
              }, null, 8, ["item"]))), 128))
            ]),
            _: 2
          }, 1032, ["title", "prop", "note", "cell"]))), 128)),
          s.content ? (h(), A("div", R$, [
            O(La, {
              spec: s.content
            }, null, 8, ["spec"])
          ])) : Y("", !0)
        ]),
        _: 2
      }, 1032, ["id", "title", "description", "components", "playground"]))), 128)),
      a(Vo).length ? Y("", !0) : (h(), A("p", D$, " No specimens yet. Add files to design/specimens (see the README) to show your components here. "))
    ], 64));
  }
}), B$ = { class: "dse:flex dse:flex-col dse:gap-3" }, N$ = { class: "dse:flex dse:h-24 dse:items-center dse:justify-center dse:rounded-control dse:bg-secondary-background/60" }, V$ = { class: "dse:flex dse:items-center dse:gap-2" }, L$ = { class: "dse:w-24 dse:shrink-0 dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground dse:tabular-nums" }, z$ = { class: "dse:flex dse:items-center dse:gap-2" }, j$ = /* @__PURE__ */ V({
  __name: "AnimationPlayer",
  props: {
    animation: {}
  },
  setup(e) {
    const t = /* @__PURE__ */ B(), n = /* @__PURE__ */ B(1), s = /* @__PURE__ */ B(!1), o = /* @__PURE__ */ B(!0), r = /* @__PURE__ */ B("1"), i = [
      { value: "0.1", label: "0.1×" },
      { value: "0.25", label: "¼×" },
      { value: "0.5", label: "½×" },
      { value: "1", label: "1×" }
    ], l = /* @__PURE__ */ B(0), u = q(() => Math.round(n.value * l.value));
    let d = null, c = 0;
    function f() {
      d?.cancel();
      const w = t.value;
      w && (w.style.animation = "none", w.offsetWidth, w.style.animation = e.animation, w.style.animationIterationCount = "1", w.style.animationFillMode = "both", d = w.getAnimations()[0] ?? null, d && (d.pause(), l.value = Number(d.effect?.getComputedTiming().duration ?? 0), d.currentTime = n.value * l.value, d.onfinish = () => {
        o.value && s.value ? (d.currentTime = 0, d.play()) : g(1);
      }));
    }
    function m() {
      d && l.value && (n.value = Math.min(1, Number(d.currentTime ?? 0) / l.value)), s.value && (c = requestAnimationFrame(m));
    }
    function p() {
      d || f(), d && (n.value >= 1 && (d.currentTime = 0), d.playbackRate = Number(r.value), d.play(), s.value = !0, c = requestAnimationFrame(m));
    }
    function g(w) {
      d?.pause(), s.value = !1, cancelAnimationFrame(c), w !== void 0 && (n.value = w);
    }
    function b(w) {
      !w || !d || (g(w[0] / 100), d.currentTime = n.value * l.value);
    }
    return ve(r, (w) => d && (d.playbackRate = Number(w))), ve(
      () => e.animation,
      () => {
        g(1), f();
      }
    ), Ke(f), an(() => {
      cancelAnimationFrame(c), d?.cancel();
    }), (w, x) => (h(), A("div", B$, [
      T("div", N$, [
        T("span", {
          ref_key: "tile",
          ref: t,
          class: "dse:size-12 dse:rounded-card dse:bg-inverted-background"
        }, null, 512)
      ]),
      T("div", V$, [
        O(Te, {
          variant: "ghost",
          size: "icon-sm",
          "aria-label": s.value ? "Pause" : "Play",
          onClick: x[0] || (x[0] = (y) => s.value ? g() : p())
        }, {
          default: E(() => [
            s.value ? (h(), D(a(Bg), {
              key: 0,
              size: 14
            })) : (h(), D(a(Ng), {
              key: 1,
              size: 14
            }))
          ]),
          _: 1
        }, 8, ["aria-label"]),
        O(a(Uf), {
          "model-value": [n.value * 100],
          max: 100,
          step: 0.1,
          class: "dse:relative dse:flex dse:h-4 dse:flex-1 dse:touch-none dse:items-center dse:select-none",
          "onUpdate:modelValue": b
        }, {
          default: E(() => [
            O(a(Yf), { class: "dse:relative dse:h-1 dse:grow dse:rounded-full dse:bg-secondary-background-hover" }, {
              default: E(() => [
                O(a(ux), { class: "dse:absolute dse:h-full dse:rounded-full dse:bg-base-foreground" })
              ]),
              _: 1
            }),
            O(a(Gf), {
              "aria-label": "Timeline",
              class: "dse:block dse:size-3 dse:rounded-full dse:bg-base-foreground dse:outline-none dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
            })
          ]),
          _: 1
        }, 8, ["model-value"]),
        T("span", L$, R(u.value) + " / " + R(l.value) + "ms", 1)
      ]),
      T("div", z$, [
        O(Es, {
          modelValue: r.value,
          "onUpdate:modelValue": x[1] || (x[1] = (y) => r.value = y),
          size: "sm",
          variant: "contained",
          options: i
        }, null, 8, ["modelValue"]),
        O(Te, {
          variant: "ghost",
          size: "sm",
          class: Ee(["dse:ml-auto", o.value && "dse:bg-secondary-background dse:text-base-foreground"]),
          "aria-pressed": o.value,
          onClick: x[2] || (x[2] = (y) => o.value = !o.value)
        }, {
          default: E(() => [
            O(a(Vg), { size: 13 }),
            x[3] || (x[3] = Q("Loop", -1))
          ]),
          _: 1
        }, 8, ["aria-pressed", "class"])
      ])
    ]));
  }
}), K$ = {
  key: 0,
  class: "dse:inline-flex dse:h-5 dse:shrink-0 dse:items-center dse:gap-1 dse:self-start dse:rounded-full dse:bg-accent/15 dse:px-2 dse:font-sans dse:text-ui dse:font-medium dse:text-base-foreground"
}, H$ = {
  key: 1,
  class: "dse:inline-flex dse:h-5 dse:shrink-0 dse:items-center dse:self-start dse:rounded-full dse:px-2 dse:font-sans dse:text-ui dse:font-medium dse:text-base-foreground dse:ring-1 dse:ring-accent dse:ring-inset"
}, U$ = {
  key: 2,
  class: "dse:inline-flex dse:h-5 dse:min-w-0 dse:items-center dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
}, W$ = {
  key: 3,
  class: "dse:inline-flex dse:h-5 dse:shrink-0 dse:items-center dse:font-mono dse:text-ui dse:text-base-foreground"
}, gr = /* @__PURE__ */ V({
  __name: "PlanMark",
  props: {
    token: {}
  },
  setup(e) {
    const t = q(() => Zp(e.token));
    return (n, s) => t.value?.kind === "keep" || t.value?.kind === "picked" && t.value.keep ? (h(), A("span", K$, [
      O(a(ms), {
        size: 11,
        class: "dse:text-accent"
      }),
      s[0] || (s[0] = Q("Keep", -1)),
      t.value.kind === "keep" ? (h(), A(W, { key: 0 }, [
        Q(" · +" + R(t.value.absorbs), 1)
      ], 64)) : Y("", !0)
    ])) : t.value?.kind === "picked" ? (h(), A("span", H$, "Picked")) : t.value?.kind === "retire" ? (h(), A("span", U$, "→ " + R(a(me)(t.value.into)), 1)) : t.value?.kind === "set" ? (h(), A("span", W$, "→ " + R(t.value.value), 1)) : Y("", !0);
  }
}), G$ = {
  key: 0,
  class: "dse:grid dse:grid-cols-4 dse:gap-3"
}, Y$ = ["data-token"], X$ = { class: "dse:flex dse:items-baseline dse:gap-2 dse:font-mono dse:text-ui dse:text-muted-foreground" }, J$ = { class: "dse:truncate" }, Z$ = { class: "dse:ml-auto dse:shrink-0 dse:text-subtle-foreground dse:tabular-nums" }, Q$ = {
  key: 1,
  class: "dse:flex dse:flex-col dse:gap-4"
}, eE = { class: "dse:w-40 dse:shrink-0 dse:font-mono dse:text-ui dse:text-subtle-foreground" }, tE = { class: "dse:w-12 dse:shrink-0 dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground dse:tabular-nums" }, nE = ["data-token"], sE = {
  key: 2,
  class: "dse:grid dse:grid-cols-2 dse:gap-3"
}, oE = ["data-token"], rE = { class: "dse:font-mono dse:text-ui dse:text-muted-foreground" }, iE = {
  key: 3,
  class: "dse:flex dse:flex-wrap dse:items-end dse:gap-4"
}, lE = ["data-token"], aE = { class: "dse:font-mono dse:text-ui dse:text-muted-foreground" }, uE = {
  key: 4,
  class: "dse:flex dse:flex-wrap dse:gap-x-10 dse:gap-y-8 dse:py-4"
}, dE = ["data-token"], cE = { class: "dse:font-mono dse:text-ui dse:text-muted-foreground" }, fE = {
  key: 5,
  class: "dse:flex dse:flex-wrap dse:gap-6"
}, pE = ["data-token"], mE = { class: "dse:font-mono dse:text-ui dse:text-muted-foreground" }, hE = {
  key: 6,
  class: "dse:grid dse:grid-cols-3 dse:gap-3"
}, gE = ["data-token"], vE = {
  viewBox: "-4 -8 56 64",
  class: "dse:h-20 dse:w-full dse:overflow-visible",
  "aria-hidden": "true"
}, yE = ["d"], bE = { class: "dse:relative dse:h-1 dse:rounded-full dse:bg-secondary-background" }, xE = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-muted-foreground" }, wE = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, kE = {
  key: 7,
  class: "dse:grid dse:grid-cols-2 dse:gap-3"
}, _E = ["data-token"], CE = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-muted-foreground" }, SE = { class: "dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, $E = {
  key: 0,
  class: "dse:text-ui dse:text-subtle-foreground"
}, EE = {
  key: 8,
  class: "dse:flex dse:flex-col dse:gap-3"
}, TE = { class: "dse:w-40 dse:shrink-0 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, AE = ["data-token"], PE = { class: "dse:ml-auto dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, OE = {
  key: 9,
  class: "dse:flex dse:flex-col dse:gap-2"
}, ME = { class: "dse:w-40 dse:shrink-0 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground" }, qE = { class: "dse:h-3 dse:flex-1" }, IE = ["data-token"], RE = {
  key: 10,
  class: "dse:flex dse:flex-wrap dse:items-end dse:gap-4"
}, DE = ["data-token"], FE = { class: "dse:font-mono dse:text-ui dse:text-muted-foreground" }, BE = {
  key: 11,
  class: "dse:flex dse:flex-col"
}, NE = ["data-token"], VE = { class: "dse:w-48 dse:shrink-0 dse:truncate dse:font-mono" }, LE = { class: "dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-muted-foreground" }, zE = { class: "dse:font-mono dse:text-subtle-foreground dse:tabular-nums" }, jE = { class: "dse:flex dse:flex-col dse:gap-2" }, KE = { class: "dse:w-24 dse:font-mono dse:text-ui dse:text-subtle-foreground" }, HE = { class: "dse:font-mono" }, UE = { class: "dse:text-muted-foreground" }, WE = "repeating-linear-gradient(45deg, oklch(0.75 0.15 60) 0 10px, oklch(0.6 0.18 260) 10px 20px, oklch(0.8 0.12 150) 20px 30px)", GE = /* @__PURE__ */ V({
  __name: "Foundations",
  setup(e) {
    const t = ["color", "text", "radius", "shadow"], n = Yo.filter((w) => w.ns.id !== "spacing"), s = (w) => yt(w).total, o = (w) => lt.find((x) => x.name === w), r = (w) => o(`${w.name}--line-height`), i = (w) => w.replace(/var\(--([\w-]+)\)/g, (x, y) => {
      const v = o(y);
      return v ? i(le(v)) : x;
    }), l = {
      linear: [0, 0, 1, 1],
      ease: [0.25, 0.1, 0.25, 1],
      "ease-in": [0.42, 0, 1, 1],
      "ease-out": [0, 0, 0.58, 1],
      "ease-in-out": [0.42, 0, 0.58, 1]
    };
    function u(w) {
      const x = /cubic-bezier\(([^)]+)\)/.exec(w), y = x ? x[1].split(",").map(Number) : l[w.trim()];
      if (!y || y.length !== 4) return "";
      const [v, C, F, $] = y, S = (k) => 48 - k * 48;
      return `M0,48 C${v * 48},${S(C)} ${F * 48},${S($)} 48,0`;
    }
    const d = (w) => [...Vr.keys()].find((x) => new RegExp(`(^|\\s)${x}(\\s|,|$)`).test(w));
    let c = null;
    Ke(() => {
      c = document.createElement("style"), c.textContent = [...Vr.values()].join(`
`), document.head.appendChild(c);
    }), an(() => c?.remove());
    const f = (w, x) => {
      const y = Math.max(...w.map((v) => Un(le(v)) ?? 0), 1);
      return `${(Un(le(x)) ?? 0) / y * 100}%`;
    }, m = o("spacing"), p = q(() => m && Un(le(m)) || 4), g = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16], b = q(
      () => lt.filter((w) => $p.includes(w.group) && !Ep(le(w)))
    );
    return (w, x) => (h(), A(W, null, [
      (h(!0), A(W, null, pe(a(n), (y) => (h(), D(xr, {
        id: y.ns.id,
        key: y.ns.id,
        title: y.ns.label,
        description: y.ns.description,
        tokens: y.tokens,
        consolidate: t.includes(y.ns.id) ? y.ns.id : void 0
      }, {
        default: E(() => [
          y.ns.preview === "color" ? (h(), A("div", G$, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:gap-2"
            }, [
              T("span", {
                class: Ee(["dse:h-12 dse:rounded-control dse:border dse:border-border-default", a(hr)(v)]),
                "data-token": v.name,
                style: Ie({ background: a(le)(v) })
              }, null, 14, Y$),
              T("span", X$, [
                T("span", J$, R(a(me)(v)), 1),
                T("span", Z$, R(s(v)) + "×", 1)
              ]),
              O(gr, { token: v }, null, 8, ["token"])
            ]))), 128))
          ])) : y.ns.preview === "text" ? (h(), A("div", Q$, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:items-baseline dse:gap-6"
            }, [
              T("span", eE, [
                Q(R(a(me)(v)) + " · " + R(a(le)(v)), 1),
                r(v) ? (h(), A(W, { key: 0 }, [
                  Q(" / " + R(a(le)(r(v))), 1)
                ], 64)) : Y("", !0)
              ]),
              T("span", tE, R(s(v)) + "×", 1),
              T("span", {
                class: Ee(["dse:rounded-min", a(hr)(v)]),
                "data-token": v.name,
                style: Ie({
                  fontSize: i(a(le)(v)),
                  lineHeight: r(v) ? i(a(le)(r(v))) : void 0,
                  fontFamily: "var(--dse-host-font)"
                })
              }, "The quick brown fox jumps over the lazy dog", 14, nE),
              O(gr, {
                token: v,
                class: "dse:ml-auto"
              }, null, 8, ["token"])
            ]))), 128))
          ])) : y.ns.preview === "leading" ? (h(), A("div", sE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:gap-2"
            }, [
              T("p", {
                class: "dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background/60 dse:px-3",
                "data-token": v.name,
                style: Ie({
                  lineHeight: a(le)(v),
                  fontSize: v.parent && o(v.parent) ? i(a(le)(o(v.parent))) : void 0
                })
              }, [...x[0] || (x[0] = [
                Q(" Two lines of text set", -1),
                T("br", null, null, -1),
                Q("at this line height ", -1)
              ])], 12, oE),
              T("span", rE, R(a(me)(v)) + " · " + R(a(le)(v)) + " · " + R(s(v)) + "×", 1)
            ]))), 128))
          ])) : y.ns.preview === "radius" ? (h(), A("div", iE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:items-center dse:gap-2"
            }, [
              T("span", {
                class: Ee(["dse:size-20 dse:border dse:border-border-strong dse:bg-card-background", a(hr)(v)]),
                "data-token": v.name,
                style: Ie({ borderRadius: i(a(le)(v)) })
              }, null, 14, lE),
              T("span", aE, R(a(me)(v)) + " · " + R(a(le)(v)) + " · " + R(s(v)) + "×", 1),
              O(gr, { token: v }, null, 8, ["token"])
            ]))), 128))
          ])) : y.ns.preview === "shadow" ? (h(), A("div", uE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:items-center dse:gap-3"
            }, [
              T("span", {
                class: Ee(["dse:size-24 dse:rounded-card dse:bg-card-background-hover", a(hr)(v)]),
                "data-token": v.name,
                style: Ie({ boxShadow: i(a(le)(v)) })
              }, null, 14, dE),
              T("span", cE, R(a(me)(v)) + " · " + R(s(v)) + "×", 1),
              O(gr, { token: v }, null, 8, ["token"])
            ]))), 128))
          ])) : y.ns.preview === "blur" ? (h(), A("div", fE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:items-center dse:gap-2"
            }, [
              T("span", {
                class: "dse:relative dse:block dse:h-24 dse:w-40 dse:overflow-hidden dse:rounded-card",
                "data-token": v.name
              }, [
                T("span", {
                  class: "dse:block dse:size-full",
                  style: Ie({ background: WE })
                }, null, 4),
                T("span", {
                  class: "dse:absolute dse:inset-y-0 dse:right-0 dse:w-1/2 dse:border-l dse:border-border-strong",
                  style: Ie({ backdropFilter: `blur(${a(le)(v)})` })
                }, null, 4)
              ], 8, pE),
              T("span", mE, R(a(me)(v)) + " · " + R(a(le)(v)) + " · " + R(s(v)) + "×", 1)
            ]))), 128))
          ])) : y.ns.preview === "ease" ? (h(), A("div", hE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:group dse:flex dse:flex-col dse:gap-3 dse:rounded-control dse:border dse:border-border-default dse:p-4",
              "data-token": v.name
            }, [
              (h(), A("svg", vE, [
                x[1] || (x[1] = T("path", {
                  d: "M0,48 L48,0",
                  class: "dse:stroke-border-strong",
                  "stroke-dasharray": "2 3",
                  fill: "none"
                }, null, -1)),
                T("path", {
                  d: u(a(le)(v)),
                  class: "dse:stroke-base-foreground",
                  "stroke-width": "2",
                  fill: "none"
                }, null, 8, yE)
              ])),
              T("span", bE, [
                T("span", {
                  class: "dse:absolute dse:-top-1 dse:left-0 dse:size-3 dse:rounded-full dse:bg-base-foreground dse:transition-[left] dse:duration-700 dse:group-hover:left-[calc(100%-12px)]",
                  style: Ie({ transitionTimingFunction: i(a(le)(v)) })
                }, null, 4)
              ]),
              T("span", xE, R(a(me)(v)) + " · " + R(s(v)) + "×", 1),
              T("span", wE, R(a(le)(v)), 1)
            ], 8, gE))), 128))
          ])) : y.ns.preview === "animate" ? (h(), A("div", kE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:gap-3 dse:rounded-control dse:border dse:border-border-default dse:p-4",
              "data-token": v.name
            }, [
              O(j$, {
                animation: i(a(le)(v))
              }, null, 8, ["animation"]),
              T("span", CE, R(a(me)(v)) + " · " + R(s(v)) + "×", 1),
              T("span", SE, R(a(le)(v)), 1),
              d(a(le)(v)) ? Y("", !0) : (h(), A("span", $E, "Keyframes not declared in the theme."))
            ], 8, _E))), 128))
          ])) : ["font", "weight", "tracking"].includes(y.ns.preview) ? (h(), A("div", EE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:items-baseline dse:gap-6"
            }, [
              T("span", TE, R(a(me)(v)) + " · " + R(s(v)) + "×", 1),
              T("span", {
                class: "dse:text-heading",
                "data-token": v.name,
                style: Ie({
                  fontFamily: y.ns.preview === "font" ? a(le)(v) : void 0,
                  fontWeight: y.ns.preview === "weight" ? a(le)(v) : void 0,
                  letterSpacing: y.ns.preview === "tracking" ? a(le)(v) : void 0,
                  fontSize: v.parent && o(v.parent) ? i(a(le)(o(v.parent))) : void 0
                })
              }, "The quick brown fox jumps over the lazy dog", 12, AE),
              T("span", PE, R(a(le)(v)), 1)
            ]))), 128))
          ])) : y.ns.preview === "size" ? (h(), A("div", OE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:items-center dse:gap-4"
            }, [
              T("span", ME, R(a(me)(v)) + " · " + R(a(le)(v)), 1),
              T("span", qE, [
                T("span", {
                  class: "dse:block dse:h-full dse:rounded-min dse:bg-inverted-background",
                  "data-token": v.name,
                  style: Ie({ width: f(y.tokens, v) })
                }, null, 12, IE)
              ])
            ]))), 128))
          ])) : y.ns.preview === "aspect" ? (h(), A("div", RE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:flex-col dse:items-center dse:gap-2"
            }, [
              T("span", {
                class: "dse:h-20 dse:rounded-control dse:border dse:border-border-strong dse:bg-secondary-background",
                "data-token": v.name,
                style: Ie({ aspectRatio: a(le)(v) })
              }, null, 12, DE),
              T("span", FE, R(a(me)(v)) + " · " + R(a(le)(v)), 1)
            ]))), 128))
          ])) : (h(), A("div", BE, [
            (h(!0), A(W, null, pe(y.tokens, (v) => (h(), A("div", {
              key: v.name,
              class: "dse:flex dse:items-center dse:gap-4 dse:border-t dse:border-border-default dse:py-2 dse:text-ui",
              "data-token": v.name
            }, [
              T("span", VE, "--" + R(v.name), 1),
              T("span", LE, R(a(le)(v)), 1),
              T("span", zE, R(s(v)) + "×", 1)
            ], 8, NE))), 128))
          ]))
        ]),
        _: 2
      }, 1032, ["id", "title", "description", "tokens", "consolidate"]))), 128)),
      O(xr, {
        id: "spacing",
        title: "Spacing",
        description: `${a(m) ? "The theme’s" : "Tailwind’s"} ${p.value}px step behind p-*, m-*, gap-*, w-* … Use whole steps; half steps (2.5, 1.5) fall off the grid.`
      }, {
        default: E(() => [
          T("div", jE, [
            (h(), A(W, null, pe(g, (y) => T("div", {
              key: y,
              class: "dse:flex dse:items-center dse:gap-4"
            }, [
              T("span", KE, R(y) + " · " + R(y * p.value) + "px", 1),
              T("span", {
                class: "dse:h-3 dse:rounded-min dse:bg-inverted-background",
                style: Ie({ width: `${y * p.value}px` })
              }, null, 4)
            ])), 64))
          ])
        ]),
        _: 1
      }, 8, ["description"]),
      O(xr, {
        id: "grid",
        title: "Grid check",
        description: "Size tokens (radius, line-height, blur) must be multiples of 4. Updates as you tweak."
      }, {
        default: E(() => [
          b.value.length ? (h(), D(Vn, {
            key: 1,
            variant: "inset",
            padding: "md",
            class: "dse:flex dse:flex-col dse:gap-2"
          }, {
            default: E(() => [
              (h(!0), A(W, null, pe(b.value, (y) => (h(), A("div", {
                key: y.name,
                class: "dse:flex dse:items-center dse:gap-2 dse:text-ui"
              }, [
                O(Bt, {
                  variant: "outline",
                  size: "sm"
                }, {
                  default: E(() => [...x[3] || (x[3] = [
                    Q("off grid", -1)
                  ])]),
                  _: 1
                }),
                T("span", HE, "--" + R(y.name), 1),
                T("span", UE, R(a(le)(y)), 1)
              ]))), 128))
            ]),
            _: 1
          })) : (h(), D(Vn, {
            key: 0,
            variant: "inset",
            padding: "md",
            class: "dse:flex dse:items-center dse:gap-2 dse:text-ui"
          }, {
            default: E(() => [
              O(a(ms), {
                size: 14,
                class: "dse:text-status-running"
              }),
              x[2] || (x[2] = Q("Every size token is on the 4px grid. ", -1))
            ]),
            _: 1
          }))
        ]),
        _: 1
      })
    ], 64));
  }
}), YE = { class: "dse:flex dse:h-full dse:min-h-0 dse:flex-col dse:bg-card-background" }, XE = { class: "dse:relative dse:flex dse:h-12 dse:shrink-0 dse:items-center dse:gap-4 dse:border-b dse:border-border-default dse:px-4" }, JE = { class: "dse:text-ui dse:font-semibold" }, ZE = { class: "dse:ml-auto dse:flex dse:items-center dse:gap-4" }, QE = {
  key: 0,
  class: "dse:flex dse:items-center dse:gap-2 dse:text-ui"
}, eT = { class: "dse:font-medium" }, tT = {
  key: 1,
  class: "dse:flex dse:items-center dse:gap-2 dse:text-ui"
}, nT = { class: "dse:font-medium" }, sT = { class: "dse:flex dse:min-h-0 dse:flex-1" }, oT = { class: "dse:px-2 dse:pb-1 dse:text-ui dse:font-medium dse:tracking-wider dse:text-subtle-foreground dse:uppercase" }, rT = { class: "dse:mx-auto dse:flex dse:w-full dse:max-w-4xl dse:flex-col dse:gap-6 dse:px-12 dse:pt-12 dse:pb-24" }, iT = { class: "dse:mb-6" }, lT = { class: "dse:text-title dse:font-semibold" }, aT = { class: "dse:mt-1 dse:text-ui dse:text-muted-foreground" }, uT = {
  key: 1,
  class: "dse:relative dse:flex dse:min-h-0 dse:flex-1"
}, dT = ["src"], cT = {
  key: 0,
  class: "dse:absolute dse:bottom-3 dse:left-3 dse:rounded-control dse:bg-media-overlay dse:px-2 dse:py-1 dse:text-ui dse:text-muted-foreground"
}, fT = /* @__PURE__ */ V({
  __name: "App",
  setup(e) {
    const t = {
      tokens: [
        {
          group: "Foundations",
          items: [
            ...Yo.filter((S) => S.ns.id !== "spacing").map(
              (S) => [S.ns.id, S.ns.label]
            ),
            ["spacing", "Spacing"],
            ["grid", "Grid check"]
          ]
        }
      ],
      // Sections grouped by their `nav` label, in order.
      components: Vo.value.reduce((S, k) => {
        const M = k.nav ?? "Components";
        let I = S.find((L) => L.group === M);
        return I || S.push(I = { group: M, items: [] }), I.items.push([k.id, k.title]), S;
      }, [])
    }, n = _e.systems.map((S) => ({ value: S.id, label: S.label })), s = /* @__PURE__ */ B(_e.system.id);
    ve(s, (S) => {
      const k = new URL(location.href);
      k.searchParams.set("system", S), location.href = k.toString();
    });
    const o = [
      { value: "tokens", label: "Tokens" },
      { value: "components", label: "Components" },
      ..._e.prototype ? [{ value: "prototype", label: "Prototype" }] : []
    ], r = localStorage.getItem(js("tab")), i = /* @__PURE__ */ B(r && o.some((S) => S.value === r) ? r : "components");
    ve(i, (S) => localStorage.setItem(js("tab"), S));
    const l = q(
      () => Se.value ? { id: Se.value.group, icon: na, label: "Consolidating" } : Je.value ? { id: Je.value.section, icon: Lg, label: "Editing" } : null
    ), u = q(() => Je.value?.token ?? null), d = document.createElement("style");
    document.head.appendChild(d), ve(u, (S) => {
      const k = Je.value?.section;
      if (!S || !k) return void (d.textContent = "");
      const M = `[data-token="${CSS.escape(S)}"]`, I = `#${CSS.escape(k)} [data-token]:not(${M})`;
      d.textContent = [
        `${I} { opacity: 0.55; transition: opacity 150ms; }`,
        `${I}:hover { opacity: 1; }`,
        `${M} { position: relative; }`,
        `${M}::after { content: ''; position: absolute; left: 0; bottom: -6px; width: 16px; height: 2px; border-radius: 2px; background: var(--dse-color-accent); pointer-events: none; }`
      ].join(`
`);
    }), an(() => d.remove());
    const c = /* @__PURE__ */ B(), f = /* @__PURE__ */ B(), m = /* @__PURE__ */ B("");
    let p = null;
    function g() {
      const S = c.value;
      if (!S || p || i.value === "prototype") return;
      const k = t[i.value].flatMap((se) => se.items.map(([ie]) => ie)), M = S.scrollTop + S.clientHeight >= S.scrollHeight - 4, I = S.getBoundingClientRect().top;
      let L = k[0] ?? "";
      for (const se of k) {
        const ie = document.getElementById(se);
        ie && ie.getBoundingClientRect().top - I <= 96 && (L = se);
      }
      m.value = M ? k[k.length - 1] ?? L : L;
    }
    let b = 0;
    const w = () => {
      cancelAnimationFrame(b), b = requestAnimationFrame(g);
    };
    function x(S) {
      p = S, m.value = S, document.getElementById(S)?.scrollIntoView({ behavior: "smooth", block: "start" });
      const k = () => {
        p = null;
      };
      c.value?.addEventListener("scrollend", k, { once: !0 }), setTimeout(k, 1200);
    }
    ve(i, () => Ue(g)), ve(
      m,
      () => Ue(() => f.value?.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest" }))
    ), Ke(() => Ue(g));
    function y(S) {
      if (i.value !== "tokens") return;
      const k = dk(S.target);
      k && (!Se.value && Je.value?.token === k.name || (S.preventDefault(), S.stopPropagation(), S.type === "click" && (Se.value ? k.group === Se.value.group && em(k) : Ma({ section: k.group, component: null, label: me(k), token: k.name }))));
    }
    function v(S) {
      const k = document.querySelector(
        '[data-reka-popper-content-wrapper], [role="dialog"][data-state="open"]'
      );
      S.key !== "Escape" || k || S.defaultPrevented || (Se.value ? Hr() : Je.value && Ai());
    }
    Ke(() => window.addEventListener("keydown", v, !0)), an(() => window.removeEventListener("keydown", v, !0));
    let C = null;
    const F = /* @__PURE__ */ B(!1);
    function $(S) {
      let k = null;
      try {
        k = S.target.contentDocument;
      } catch {
        k = null;
      }
      F.value = !k, C && gd(C), C = k, k && tk(k);
    }
    return an(() => C && gd(C)), (S, k) => (h(), D(a(M0), { "delay-duration": 300 }, {
      default: E(() => [
        T("div", YE, [
          T("header", XE, [
            T("h1", JE, R(a(_e).name || "Design system"), 1),
            a(n).length > 1 ? (h(), D(xs, {
              key: 0,
              modelValue: s.value,
              "onUpdate:modelValue": k[0] || (k[0] = (M) => s.value = M),
              size: "sm",
              variant: "ghost",
              options: a(n),
              class: "dse:-ml-2"
            }, null, 8, ["modelValue", "options"])) : Y("", !0),
            O(Es, {
              modelValue: i.value,
              "onUpdate:modelValue": k[1] || (k[1] = (M) => i.value = M),
              variant: "contained",
              size: "sm",
              class: "dse:absolute dse:left-1/2 dse:-translate-x-1/2",
              options: o
            }, null, 8, ["modelValue"]),
            T("div", ZE, [
              a(Se) ? (h(), A("span", QE, [
                k[2] || (k[2] = T("span", { class: "dse:size-2 dse:rounded-full dse:bg-accent" }, null, -1)),
                k[3] || (k[3] = Q("Consolidating ", -1)),
                T("span", eT, R(a($o)), 1),
                k[4] || (k[4] = T("span", { class: "dse:text-ui dse:text-subtle-foreground" }, "· Esc to cancel", -1))
              ])) : a(Je) ? (h(), A("span", tT, [
                k[5] || (k[5] = T("span", { class: "dse:size-2 dse:rounded-full dse:bg-accent" }, null, -1)),
                k[6] || (k[6] = Q("Editing ", -1)),
                T("span", nT, R(a(Je).label), 1),
                k[7] || (k[7] = T("span", { class: "dse:text-ui dse:text-subtle-foreground" }, "· Esc to finish", -1))
              ])) : i.value === "prototype" && a(At) ? (h(), D(Bt, {
                key: 2,
                size: "md"
              }, {
                default: E(() => [
                  Q("Previewing draft · " + R(a(At)) + " " + R(a(At) === 1 ? "change" : "changes"), 1)
                ]),
                _: 1
              })) : Y("", !0),
              O(Pk)
            ])
          ]),
          T("div", sT, [
            i.value !== "prototype" ? (h(), A(W, { key: 0 }, [
              T("nav", {
                ref_key: "nav",
                ref: f,
                class: "dse:flex dse:w-56 dse:shrink-0 dse:flex-col dse:gap-4 dse:overflow-y-auto dse:border-r dse:border-border-default dse:p-3 dse:[scrollbar-width:thin]",
                "aria-label": "Sections"
              }, [
                (h(!0), A(W, null, pe(t[i.value], (M) => (h(), A("div", {
                  key: M.group,
                  class: "dse:flex dse:shrink-0 dse:flex-col"
                }, [
                  T("p", oT, R(M.group), 1),
                  (h(!0), A(W, null, pe(M.items, ([I, L]) => (h(), D(Te, {
                    key: I,
                    variant: "ghost",
                    size: "sm",
                    class: Ee([
                      "dse:shrink-0 dse:justify-start dse:font-normal",
                      m.value === I && "dse:bg-secondary-background dse:text-base-foreground"
                    ]),
                    "aria-current": m.value === I ? "location" : void 0,
                    onClick: (se) => x(I)
                  }, {
                    default: E(() => [
                      Q(R(L), 1),
                      l.value?.id === I ? (h(), D(ws(l.value.icon), {
                        key: 0,
                        size: 13,
                        class: "dse:ml-auto dse:text-accent",
                        "aria-label": l.value.label,
                        role: "img"
                      }, null, 8, ["aria-label"])) : Y("", !0)
                    ]),
                    _: 2
                  }, 1032, ["class", "aria-current", "onClick"]))), 128))
                ]))), 128))
              ], 512),
              T("main", {
                ref_key: "main",
                ref: c,
                class: Ee([
                  "dse:min-h-0 dse:flex-1 dse:overflow-y-auto dse:[scrollbar-width:thin]",
                  i.value === "tokens" && "dse:[&_[data-token]]:cursor-pointer"
                ]),
                onPointerdownCapture: y,
                onClickCapture: y,
                onScrollPassive: w
              }, [
                T("div", rT, [
                  T("header", iT, [
                    T("h1", lT, R(i.value === "tokens" ? "Tokens" : "Components"), 1),
                    T("p", aT, R(i.value === "tokens" ? "The values everything is built from. Click a token to edit it and see where it is used, or Consolidate a section to reduce them." : "Every design-system component in its states. Click one to select it and edit the tokens behind it."), 1)
                  ]),
                  i.value === "tokens" ? (h(), D(GE, { key: 0 })) : (h(), D(F$, { key: 1 }))
                ])
              ], 34)
            ], 64)) : (h(), A("div", uT, [
              T("iframe", {
                src: a(_e).prototype ?? "",
                title: "Prototype with the current draft",
                class: "dse:min-h-0 dse:flex-1 dse:border-0 dse:bg-white",
                onLoad: $
              }, null, 40, dT),
              F.value ? (h(), A("p", cT, " This app runs on another server, so the draft can't be previewed in it. ")) : Y("", !0)
            ])),
            O(a$)
          ]),
          O(V1)
        ])
      ]),
      _: 1
    }));
  }
});
function pT(e) {
  const t = document.createElement("canvas").getContext("2d");
  if (!t) return !1;
  t.fillStyle = e, t.fillRect(0, 0, 1, 1);
  const [n, s, o] = t.getImageData(0, 0, 1, 1).data;
  return 0.2126 * n + 0.7152 * s + 0.0722 * o > 150;
}
async function hT(e) {
  const t = typeof e.project == "string" ? await (await fetch(e.project)).json() : e.project;
  z1(t), X1(), sC(), fC(), ek(), Gk(), NC(e.specimens, e.adapter);
  const n = getComputedStyle(document.body), s = [n.backgroundColor, getComputedStyle(document.documentElement).backgroundColor].find(
    (r) => r && r !== "rgba(0, 0, 0, 0)" && r !== "transparent"
  ), o = e.el ?? document.body.appendChild(document.createElement("div"));
  o.id = "dse-root", o.classList.add("dse-root"), o.style.setProperty("--dse-host-font", n.fontFamily), o.style.setProperty("--dse-host-size", n.fontSize), o.style.setProperty("--dse-host-leading", n.lineHeight), o.style.setProperty("--dse-host-color", n.color), Qn.surface = s && pT(s) ? s : null, document.title = `${t.name || "Design system"} · Design system editor`, Cg(fT).mount(o);
}
export {
  hT as startEditor
};
//# sourceMappingURL=index.js.map
