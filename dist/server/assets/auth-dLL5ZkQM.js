import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-RvXzK_OZ.js";
import { d as useDirection, e as useControllableState, f as Primitive, g as useId, h as Root, I as Item, i as composeEventHandlers, j as Presence, k as createContextScope, l as createRovingFocusGroupScope, m as cn, a as useNavigate, u as useAuth, L as Link, B as Button, t as toast, s as supabase } from "./router-EmVj5R-A.js";
import { I as Input } from "./input-CvhxglK7.js";
import { L as Label } from "./label-NUMgtn5Z.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function AuthPage() {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  reactExports.useEffect(() => {
    if (user) navigate({
      to: "/"
    });
  }, [user, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl border bg-card p-8 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-center font-display text-3xl font-bold", children: [
      "Welcome to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "DailyBasket" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-center text-sm text-muted-foreground", children: "Sign in to start ordering fresh groceries." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "signin", className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", children: "Sign in with code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", children: "Sign up" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInForm, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpForm, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
      "By continuing you agree to our terms. ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary hover:underline", children: "Back to home" })
    ] })
  ] }) });
}
function SignInForm() {
  const [email, setEmail] = reactExports.useState("");
  const [code, setCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [sendingCode, setSendingCode] = reactExports.useState(false);
  const [codeSent, setCodeSent] = reactExports.useState(false);
  const [resendCooldown, setResendCooldown] = reactExports.useState(0);
  const codeInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev > 0 ? prev - 1 : 0);
    }, 1e3);
    return () => clearInterval(timer);
  }, [resendCooldown]);
  reactExports.useEffect(() => {
    if (!codeSent) return;
    codeInputRef.current?.focus();
  }, [codeSent]);
  const submit = async (e) => {
    e.preventDefault();
    if (!email || !code) {
      toast.error("Enter your email and verification code.");
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email"
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
  };
  const sendCode = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }
    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown}s before requesting another code.`);
      return;
    }
    setSendingCode(true);
    const {
      error
    } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false
      }
    });
    setSendingCode(false);
    if (error) toast.error(error.message);
    else {
      setCodeSent(true);
      setResendCooldown(60);
      toast.success("Verification code sent. Check inbox/spam and Promotions.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "si-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "si-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Use the exact same email you used during signup." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "w-full", disabled: sendingCode || resendCooldown > 0, onClick: sendCode, children: sendingCode ? "Sending code..." : resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : codeSent ? "Resend verification code" : "Send verification code" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Didn't get the code? Check Spam and Promotions, then use resend after the timer." }),
    codeSent && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "si-code", children: "Verification code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "si-code", ref: codeInputRef, inputMode: "numeric", autoComplete: "one-time-code", required: true, value: code, onChange: (e) => setCode(e.target.value), placeholder: "Enter the code from your email" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Verifying..." : "Verify and sign in" })
    ] })
  ] });
}
function SignUpForm() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: name
        }
      }
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Account created! You're signed in.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-name", children: "Full name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-name", required: true, value: name, onChange: (e) => setName(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Double-check spelling before creating the account." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-pass", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-pass", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Creating..." : "Create account" })
  ] });
}
export {
  AuthPage as component
};
