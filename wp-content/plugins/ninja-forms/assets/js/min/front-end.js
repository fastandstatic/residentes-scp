!(function () {
  var e, t, i;
  !(function (n) {
    var r,
      o,
      a,
      l,
      s = {},
      d = {},
      c = {},
      f = {},
      u = Object.prototype.hasOwnProperty,
      h = [].slice,
      m = /\.js$/;
    function g(e, t) {
      return u.call(e, t);
    }
    function p(e, t) {
      var i,
        n,
        r,
        o,
        a,
        l,
        s,
        d,
        f,
        u,
        h,
        g = t && t.split("/"),
        p = c.map,
        v = (p && p["*"]) || {};
      if (e && "." === e.charAt(0))
        if (t) {
          for (
            a = (e = e.split("/")).length - 1,
              c.nodeIdCompat && m.test(e[a]) && (e[a] = e[a].replace(m, "")),
              e = g.slice(0, g.length - 1).concat(e),
              f = 0;
            f < e.length;
            f += 1
          )
            if ("." === (h = e[f])) e.splice(f, 1), (f -= 1);
            else if (".." === h) {
              if (1 === f && (".." === e[2] || ".." === e[0])) break;
              f > 0 && (e.splice(f - 1, 2), (f -= 2));
            }
          e = e.join("/");
        } else 0 === e.indexOf("./") && (e = e.substring(2));
      if ((g || v) && p) {
        for (f = (i = e.split("/")).length; f > 0; f -= 1) {
          if (((n = i.slice(0, f).join("/")), g))
            for (u = g.length; u > 0; u -= 1)
              if ((r = p[g.slice(0, u).join("/")]) && (r = r[n])) {
                (o = r), (l = f);
                break;
              }
          if (o) break;
          !s && v && v[n] && ((s = v[n]), (d = f));
        }
        !o && s && ((o = s), (l = d)),
          o && (i.splice(0, l, o), (e = i.join("/")));
      }
      return e;
    }
    function v(e, t) {
      return function () {
        var i = h.call(arguments, 0);
        return (
          "string" != typeof i[0] && 1 === i.length && i.push(null),
          o.apply(n, i.concat([e, t]))
        );
      };
    }
    function y(e) {
      return function (t) {
        s[e] = t;
      };
    }
    function b(e) {
      if (g(d, e)) {
        var t = d[e];
        delete d[e], (f[e] = !0), r.apply(n, t);
      }
      if (!g(s, e) && !g(f, e)) throw new Error("No " + e);
      return s[e];
    }
    function R(e) {
      var t,
        i = e ? e.indexOf("!") : -1;
      return (
        i > -1 && ((t = e.substring(0, i)), (e = e.substring(i + 1, e.length))),
        [t, e]
      );
    }
    function _(e) {
      return function () {
        return (c && c.config && c.config[e]) || {};
      };
    }
    (a = function (e, t) {
      var i,
        n = R(e),
        r = n[0];
      return (
        (e = n[1]),
        r && (i = b((r = p(r, t)))),
        r
          ? (e =
              i && i.normalize
                ? i.normalize(
                    e,
                    (function (e) {
                      return function (t) {
                        return p(t, e);
                      };
                    })(t)
                  )
                : p(e, t))
          : ((r = (n = R((e = p(e, t))))[0]), (e = n[1]), r && (i = b(r))),
        { f: r ? r + "!" + e : e, n: e, pr: r, p: i }
      );
    }),
      (l = {
        require: function (e) {
          return v(e);
        },
        exports: function (e) {
          var t = s[e];
          return void 0 !== t ? t : (s[e] = {});
        },
        module: function (e) {
          return { id: e, uri: "", exports: s[e], config: _(e) };
        },
      }),
      (r = function (e, t, i, r) {
        var o,
          c,
          u,
          h,
          m,
          p,
          R = [],
          _ = typeof i;
        if (((r = r || e), "undefined" === _ || "function" === _)) {
          for (
            t = !t.length && i.length ? ["require", "exports", "module"] : t,
              m = 0;
            m < t.length;
            m += 1
          )
            if ("require" === (c = (h = a(t[m], r)).f)) R[m] = l.require(e);
            else if ("exports" === c) (R[m] = l.exports(e)), (p = !0);
            else if ("module" === c) o = R[m] = l.module(e);
            else if (g(s, c) || g(d, c) || g(f, c)) R[m] = b(c);
            else {
              if (!h.p) throw new Error(e + " missing " + c);
              h.p.load(h.n, v(r, !0), y(c), {}), (R[m] = s[c]);
            }
          (u = i ? i.apply(s[e], R) : void 0),
            e &&
              (o && o.exports !== n && o.exports !== s[e]
                ? (s[e] = o.exports)
                : (u === n && p) || (s[e] = u));
        } else e && (s[e] = i);
      }),
      (e =
        t =
        o =
          function (e, t, i, s, d) {
            if ("string" == typeof e) return l[e] ? l[e](t) : b(a(e, t).f);
            if (!e.splice) {
              if (((c = e).deps && o(c.deps, c.callback), !t)) return;
              t.splice ? ((e = t), (t = i), (i = null)) : (e = n);
            }
            return (
              (t = t || function () {}),
              "function" == typeof i && ((i = s), (s = d)),
              s
                ? r(n, e, t, i)
                : setTimeout(function () {
                    r(n, e, t, i);
                  }, 4),
              o
            );
          }),
      (o.config = function (e) {
        return o(e);
      }),
      (e._defined = s),
      ((i = function (e, t, i) {
        if ("string" != typeof e)
          throw new Error(
            "See almond README: incorrect module build, no module name"
          );
        t.splice || ((i = t), (t = [])),
          g(s, e) || g(d, e) || (d[e] = [e, t, i]);
      }).amd = { jQuery: !0 });
  })(),
    i("../lib/almond", function () {}),
    i("models/fieldErrorModel", [], function () {
      return Backbone.Model.extend({});
    }),
    i("models/fieldErrorCollection", ["models/fieldErrorModel"], function (e) {
      return Backbone.Collection.extend({ model: e });
    }),
    i("models/fieldModel", ["models/fieldErrorCollection"], function (e) {
      return Backbone.Model.extend({
        defaults: {
          placeholder: "",
          value: "",
          label_pos: "",
          classes: "ninja-forms-field",
          reRender: !1,
          mirror_field: !1,
          confirm_field: !1,
          clean: !0,
          disabled: "",
          visible: !0,
          invalid: !1,
        },
        initialize: function () {
          var t = this.get("type");
          this.set("formID", this.collection.options.formModel.get("id")),
            this.listenTo(
              nfRadio.channel("form-" + this.get("formID")),
              "reset",
              this.resetModel
            ),
            this.bind("change", this.changeModel, this),
            this.bind("change:value", this.changeValue, this),
            this.set("errors", new e()),
            "listimage" === t &&
              ((this.get = this.listimageGet), (this.set = this.listimageSet)),
            nfRadio.channel("fields").trigger("init:model", this),
            nfRadio.channel(this.get("type")).trigger("init:model", this),
            nfRadio
              .channel("fields-" + this.get("type"))
              .trigger("init:model", this),
            void 0 !== this.get("parentType") &&
              nfRadio
                .channel(this.get("parentType"))
                .trigger("init:model", this),
            this.listenTo(
              nfRadio.channel("form-" + this.get("formID")),
              "loaded",
              this.formLoaded
            ),
            this.listenTo(
              nfRadio.channel("form-" + this.get("formID")),
              "before:submit",
              this.beforeSubmit
            );
        },
        listimageGet: function (e) {
          return (
            "options" === e && (e = "image_options"),
            Backbone.Model.prototype.get.call(this, e)
          );
        },
        listimageSet: function (e, t) {
          return (
            "options" === e && (e = "image_options"),
            Backbone.Model.prototype.set.call(this, e, t)
          );
        },
        changeModel: function () {
          nfRadio
            .channel("field-" + this.get("id"))
            .trigger("change:model", this),
            nfRadio.channel(this.get("type")).trigger("change:model", this),
            nfRadio.channel("fields").trigger("change:model", this);
        },
        changeValue: function () {
          nfRadio
            .channel("field-" + this.get("id"))
            .trigger("change:modelValue", this),
            nfRadio
              .channel(this.get("type"))
              .trigger("change:modelValue", this),
            nfRadio.channel("fields").trigger("change:modelValue", this);
        },
        addWrapperClass: function (e) {
          this.set("addWrapperClass", e);
        },
        removeWrapperClass: function (e) {
          this.set("removeWrapperClass", e);
        },
        setInvalid: function (e) {
          this.set("invalid", e);
        },
        formLoaded: function () {
          nfRadio.channel("fields").trigger("formLoaded", this),
            nfRadio
              .channel("fields-" + this.get("type"))
              .trigger("formLoaded", this);
        },
        beforeSubmit: function (e) {
          nfRadio.channel(this.get("type")).trigger("before:submit", this),
            nfRadio.channel("fields").trigger("before:submit", this);
        },
        getValue: function () {
          return this.get("value");
        },
      });
    }),
    i("models/fieldCollection", ["models/fieldModel"], function (e) {
      var t = Backbone.Collection.extend({
        model: e,
        comparator: "order",
        initialize: function (e, t) {
          (this.options = t),
            this.on(
              "reset",
              function (e) {
                nfRadio.channel("fields").trigger("reset:collection", e);
              },
              this
            );
        },
        validateFields: function () {
          _.each(
            this.models,
            function (e) {
              e.set("clean", !1),
                nfRadio.channel("submit").trigger("validate:field", e);
            },
            this
          );
        },
        showFields: function () {
          this.invoke("set", { visible: !0 }),
            this.invoke(function () {
              this.trigger("change:value", this);
            });
        },
        hideFields: function () {
          this.invoke("set", { visible: !1 }),
            this.invoke(function () {
              this.trigger("change:value", this);
            });
        },
      });
      return t;
    }),
    i("models/formErrorModel", [], function () {
      return Backbone.Model.extend({});
    }),
    i("models/formErrorCollection", ["models/formErrorModel"], function (e) {
      return Backbone.Collection.extend({ model: e });
    }),
    i(
      "models/formModel",
      ["models/fieldCollection", "models/formErrorCollection"],
      function (e, t) {
        return Backbone.Model.extend({
          defaults: {
            beforeForm: "",
            afterForm: "",
            beforeFields: "",
            afterFields: "",
            wrapper_class: "",
            element_class: "",
            hp: "",
            fieldErrors: {},
            extra: {},
          },
          initialize: function () {
            _.each(
              this.get("settings"),
              function (e, t) {
                this.set(t, e);
              },
              this
            ),
              this.set("loadedFields", this.get("fields")),
              this.set(
                "fields",
                new e(this.get("fields"), { formModel: this })
              ),
              this.set("errors", new t()),
              nfRadio.channel("form").trigger("before:filterData", this);
            var i = this.get("formContentData");
            i || (i = this.get("fieldContentsData"));
            var n = nfRadio.channel("formContent").request("get:loadFilters"),
              r = _.without(n, void 0);
            (i = _.first(r)(i, this, this)),
              this.set("formContentData", i),
              nfRadio.channel("forms").trigger("init:model", this),
              nfRadio
                .channel("form-" + this.get("id"))
                .trigger("init:model", this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("get:fieldByKey", this.getFieldByKey, this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("add:error", this.addError, this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("remove:error", this.removeError, this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("get:extra", this.getExtra, this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("add:extra", this.addExtra, this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("remove:extra", this.removeExtra, this),
              nfRadio
                .channel("form-" + this.get("id"))
                .reply("get:form", this.getForm, this),
              nfRadio.channel("form").trigger("loaded", this),
              nfRadio.channel("form").trigger("after:loaded", this),
              nfRadio.channel("form-" + this.get("id")).trigger("loaded", this);
          },
          getFieldByKey: function (e) {
            return this.get("fields").findWhere({ key: e });
          },
          addError: function (e, t) {
            this.get("errors").add({ id: e, msg: t }),
              nfRadio
                .channel("form-" + this.get("id"))
                .trigger("add:error", this, e, t);
          },
          removeError: function (e) {
            var t = this.get("errors"),
              i = t.get(e);
            t.remove(i),
              nfRadio
                .channel("form-" + this.get("id"))
                .trigger("remove:error", this, e);
          },
          getExtra: function (e) {
            var t = this.get("extra");
            return void 0 === e ? t : t[e];
          },
          addExtra: function (e, t) {
            (this.get("extra")[e] = t),
              nfRadio
                .channel("form-" + this.get("id"))
                .trigger("add:extra", this, e, t);
          },
          removeExtra: function (e) {
            delete this.get("extra")[e],
              nfRadio
                .channel("form-" + this.get("id"))
                .trigger("remove:extra", this, e);
          },
          getForm: function () {
            return this;
          },
        });
      }
    ),
    i("models/formCollection", ["models/formModel"], function (e) {
      return Backbone.Collection.extend({ model: e });
    }),
    i(
      "controllers/formData",
      [
        "models/formModel",
        "models/formCollection",
        "models/fieldCollection",
        "models/formErrorCollection",
      ],
      function (e, t, i, n) {
        return Marionette.Object.extend({
          initialize: function () {
            (this.collection = new t(nfForms)),
              nfRadio.channel("forms").trigger("loaded", this.collection),
              nfRadio.channel("app").trigger("forms:loaded", this.collection),
              nfRadio.channel("app").reply("get:form", this.getForm, this),
              nfRadio.channel("app").reply("get:forms", this.getForms, this),
              nfRadio.channel("fields").reply("get:field", this.getField, this);
          },
          getForm: function (e) {
            return this.collection.get(e);
          },
          getForms: function () {
            return this.collection;
          },
          getField: function (e) {
            var t = !1;
            return (
              _.each(this.collection.models, function (i) {
                t || (t = i.get("fields").get(e));
              }),
              void 0 === t &&
                (t = nfRadio
                  .channel("field-repeater")
                  .request("get:repeaterFieldById", e)),
              t
            );
          },
        });
      }
    ),
    i("controllers/fieldError", ["models/fieldErrorModel"], function (e) {
      return Marionette.Object.extend({
        initialize: function () {
          nfRadio.channel("fields").reply("add:error", this.addError),
            nfRadio.channel("fields").reply("remove:error", this.removeError),
            nfRadio.channel("fields").reply("get:error", this.getError);
        },
        addError: function (e, t, i) {
          var n = nfRadio.channel("fields").request("get:field", e);
          if (void 0 !== n) {
            var r = n.get("errors");
            r.add({ id: t, msg: i }),
              n.set("errors", r),
              n.trigger("change:errors", n),
              n.set("clean", !1),
              nfRadio.channel("fields").trigger("add:error", n, t, i);
          }
        },
        removeError: function (e, t) {
          var i = nfRadio.channel("fields").request("get:field", e);
          if (void 0 !== i) {
            var n = i.get("errors"),
              r = n.get(t);
            void 0 !== r &&
              (n.remove(r),
              i.set("errors", n),
              i.trigger("change:errors", i),
              nfRadio.channel("fields").trigger("remove:error", i, t));
          }
        },
        getError: function (e, t) {
          var i = nfRadio
            .channel("fields")
            .request("get:field", e)
            .get("errors")
            .get(t);
          return "undefined" != i && i;
        },
      });
    }),
    i("controllers/changeField", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          nfRadio.channel("nfAdmin").reply("change:field", this.changeField),
            this.listenTo(
              nfRadio.channel("fields"),
              "blur:field",
              this.blurField
            );
        },
        changeField: function (e, t) {
          var i = nfRadio
            .channel(t.get("type"))
            .request("before:updateField", e, t);
          (i =
            void 0 !==
            (i =
              void 0 !== i
                ? i
                : nfRadio
                    .channel(t.get("parentType"))
                    .request("before:updateField", e, t))
              ? i
              : jQuery(e).val()),
            t.set("isUpdated", !1),
            t.set("clean", !1),
            nfRadio
              .channel("field-" + t.get("id"))
              .trigger("change:field", e, t),
            nfRadio.channel(t.get("type")).trigger("change:field", e, t),
            nfRadio.channel("fields").trigger("change:field", e, t),
            nfRadio.channel("nfAdmin").request("update:field", t, i);
        },
        blurField: function (e, t) {
          t.set("clean", !1);
        },
      });
    }),
    i("controllers/changeEmail", [], function () {
      var e = nfRadio.channel("email"),
        t =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        i = "invalid-email";
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(e, "change:modelValue", this.onChangeModelValue),
            this.listenTo(e, "keyup:field", this.emailKeyup),
            this.listenTo(e, "blur:field", this.onBlurField);
        },
        onChangeModelValue: function (e) {
          var t = e.get("value"),
            i = e.get("id");
          this.emailChange(t, i);
        },
        onBlurField: function (e, t) {
          var i = jQuery(e).val(),
            n = t.get("id");
          this.emailChange(i, n);
        },
        emailChange: function (e, n) {
          if (0 < e.length)
            if (t.test(e))
              nfRadio.channel("fields").request("remove:error", n, i);
            else {
              var r = nfRadio.channel("fields").request("get:field", n),
                o = nfRadio.channel("app").request("get:form", r.get("formID"));
              nfRadio
                .channel("fields")
                .request(
                  "add:error",
                  n,
                  i,
                  o.get("settings").changeEmailErrorMsg
                );
            }
          else nfRadio.channel("fields").request("remove:error", n, i);
        },
        emailKeyup: function (e, n, r) {
          if (9 == r) return !1;
          var o = jQuery(e).val(),
            a = n.get("id");
          if (0 == o.length)
            nfRadio.channel("fields").request("remove:error", a, i);
          else if (t.test(o) || n.get("clean"))
            t.test(o) &&
              (nfRadio.channel("fields").request("remove:error", a, i),
              n.addWrapperClass("nf-pass"),
              n.set("clean", !1));
          else {
            var l = nfRadio.channel("fields").request("get:field", a),
              s = nfRadio.channel("app").request("get:form", l.get("formID"));
            nfRadio
              .channel("fields")
              .request(
                "add:error",
                a,
                i,
                s.get("settings").changeEmailErrorMsg
              ),
              n.removeWrapperClass("nf-pass");
          }
        },
      });
    }),
    i("controllers/changeDate", [], function () {
      var e = nfRadio.channel("date"),
        t = "invalid-date";
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(e, "change:modelValue", this.onChangeModelValue),
            this.listenTo(e, "keyup:field", this.dateKeyup),
            this.listenTo(e, "blur:field", this.onBlurField),
            this.listenTo(e, "change:extra", this.changeHoursMinutes, this);
        },
        onChangeModelValue: function (e) {
          this.dateChange(e);
        },
        onBlurField: function (e, t) {
          this.dateChange(t);
        },
        dateChange: function (e) {
          var i = e.get("id"),
            n = e.get("value"),
            r = e.get("date_format");
          if ("time_only" == e.get("date_mode")) return !1;
          if (0 < n.length)
            if (moment(n, r).isValid())
              nfRadio.channel("fields").request("remove:error", i, t);
            else {
              var o = nfRadio.channel("fields").request("get:field", i),
                a = nfRadio.channel("app").request("get:form", o.get("formID"));
              nfRadio
                .channel("fields")
                .request(
                  "add:error",
                  i,
                  t,
                  a.get("settings").changeDateErrorMsg
                );
            }
          else nfRadio.channel("fields").request("remove:error", i, t);
        },
        dateKeyup: function (e, i, n) {
          if (9 == n) return !1;
          var r = jQuery(e).val(),
            o = i.get("id"),
            a = i.get("date_format");
          if (0 == r.length)
            nfRadio.channel("fields").request("remove:error", o, t);
          else if (moment(r, a).isValid() || i.get("clean"))
            moment(r, a).isValid() &&
              (nfRadio.channel("fields").request("remove:error", o, t),
              i.addWrapperClass("nf-pass"),
              i.set("clean", !1));
          else {
            var l = nfRadio.channel("fields").request("get:field", o),
              s = nfRadio.channel("app").request("get:form", l.get("formID"));
            nfRadio
              .channel("fields")
              .request("add:error", o, t, s.get("settings").changeDateErrorMsg),
              i.removeWrapperClass("nf-pass");
          }
        },
        changeHoursMinutes: function (e, t) {
          let i = jQuery(e.target).closest(".nf-field-element"),
            n = jQuery(i).find(".hour").val(),
            r = jQuery(i).find(".minute").val(),
            o = jQuery(i).find(".ampm").val();
          t.set("selected_hour", n),
            t.set("selected_minute", r),
            t.set("selected_ampm", o),
            t.trigger("change:value", t);
        },
      });
    }),
    i("controllers/fieldCheckbox", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("checkbox"),
            "init:model",
            this.registerRenderClasses
          ),
            nfRadio
              .channel("checkbox")
              .reply("validate:required", this.validateRequired),
            nfRadio
              .channel("checkbox")
              .reply("validate:modelData", this.validateModelData),
            nfRadio
              .channel("checkbox")
              .reply("before:updateField", this.beforeUpdateField, this),
            nfRadio
              .channel("checkbox")
              .reply("get:calcValue", this.getCalcValue, this);
        },
        beforeUpdateField: function (e, t) {
          if (jQuery(e).prop("checked")) {
            var i = 1;
            jQuery(e).addClass("nf-checked"),
              jQuery(e)
                .closest(".field-wrap")
                .find('label[for="' + jQuery(e).prop("id") + '"]')
                .addClass("nf-checked-label");
          } else {
            i = 0;
            jQuery(e).removeClass("nf-checked"),
              jQuery(e)
                .closest(".field-wrap")
                .find('label[for="' + jQuery(e).prop("id") + '"]')
                .removeClass("nf-checked-label");
          }
          return i;
        },
        validateRequired: function (e, t) {
          return e[0].checked;
        },
        validateModelData: function (e) {
          return 0 != e.get("value");
        },
        getCalcValue: function (e) {
          return (
            1 == e.get("value")
              ? (calcValue = e.get("checked_calc_value"))
              : (calcValue = e.get("unchecked_calc_value")),
            calcValue
          );
        },
        registerRenderClasses: function (e) {
          "checked" == e.get("default_value")
            ? e.set("value", 1)
            : e.set("value", 0),
            e.set("customClasses", this.customClasses),
            e.set("customLabelClasses", this.customLabelClasses),
            e.set("maybeChecked", this.maybeChecked);
        },
        customClasses: function (e) {
          return (
            1 == this.value ||
            (this.clean &&
              void 0 !== this.default_value &&
              "checked" == this.default_value)
              ? (e += " nf-checked")
              : e.replace("nf-checked", ""),
            e
          );
        },
        customLabelClasses: function (e) {
          return (
            1 == this.value ||
            (this.clean &&
              void 0 !== this.default_value &&
              "checked" == this.default_value)
              ? (e += " nf-checked-label")
              : e.replace("nf-checked-label", ""),
            e
          );
        },
        maybeChecked: function () {
          return 1 == this.value ||
            (this.clean &&
              void 0 !== this.default_value &&
              "checked" == this.default_value)
            ? " checked"
            : "";
        },
      });
    }),
    i("controllers/fieldCheckboxList", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("listcheckbox"),
            "init:model",
            this.register
          ),
            this.listenTo(
              nfRadio.channel("terms"),
              "init:model",
              this.register
            ),
            nfRadio
              .channel("listcheckbox")
              .reply("before:updateField", this.beforeUpdateField, this),
            nfRadio
              .channel("terms")
              .reply("before:updateField", this.beforeUpdateField, this),
            nfRadio
              .channel("listcheckbox")
              .reply("get:calcValue", this.getCalcValue, this),
            nfRadio
              .channel("terms")
              .reply("get:calcValue", this.getCalcValue, this);
        },
        register: function (e) {
          if (
            (e.set("renderOptions", this.renderOptions),
            e.set("renderOtherText", this.renderOtherText),
            e.set("selected", []),
            0 != e.get("options").length)
          ) {
            var t = _.filter(e.get("options"), function (e) {
              return 1 == e.selected;
            });
            t = _.map(t, function (e) {
              return e.value;
            });
          }
          var i = e.get("value");
          void 0 !== i && Array.isArray(i)
            ? e.set("value", i)
            : void 0 !== t && e.set("value", t);
        },
        renderOptions: function () {
          var e = "";
          if (
            "" == this.value ||
            (Array.isArray(this.value) && 0 < this.value.length) ||
            0 < this.value.length
          )
            var t = !0;
          else t = !1;
          if (
            (_.each(
              this.options,
              function (i, n) {
                Array.isArray(this.value) &&
                  ((Array.isArray(this.value[0]) &&
                    -1 !== _.indexOf(this.value[0], i.value)) ||
                    _.indexOf(this.value, i.value)) &&
                  (t = !0),
                  i.value == this.value && (t = !0),
                  void 0 === i.visible && (i.visible = !0),
                  (i.fieldID = this.id),
                  (i.classes = this.classes),
                  (i.index = n),
                  (i.label =
                    void 0 !== nfFrontEnd.filter_esc_status &&
                    "true" === nfFrontEnd.filter_esc_status
                      ? _.escape(i.label)
                      : i.label);
                var r = !1;
                Array.isArray(this.value) && 0 < this.value.length
                  ? (-1 === _.indexOf(this.value[0].split(","), i.value) &&
                      -1 === _.indexOf(this.value, i.value)) ||
                    (r = !0)
                  : _.isArray(this.value) || i.value != this.value
                  ? 1 == i.selected &&
                    this.clean &&
                    void 0 === this.value &&
                    (r = !0)
                  : (r = !0),
                  (i.selected = r),
                  (i.isSelected = r),
                  (i.required = this.required),
                  (i.maybeFilterHTML = this.maybeFilterHTML);
                var o = nfRadio
                  .channel("app")
                  .request(
                    "get:template",
                    "#tmpl-nf-field-listcheckbox-option"
                  );
                e += o(i);
              },
              this
            ),
            1 == this.show_other)
          ) {
            "nf-other" == this.value && (t = !1);
            var i = {
                fieldID: this.id,
                classes: this.classes,
                currentValue: this.value,
                renderOtherText: this.renderOtherText,
                valueFound: t,
              },
              n = nfRadio
                .channel("app")
                .request("get:template", "#tmpl-nf-field-listcheckbox-other");
            e += n(i);
          }
          return e;
        },
        renderOtherText: function () {
          if ("nf-other" == this.currentValue || !this.valueFound) {
            "nf-other" == this.currentValue && (this.currentValue = "");
            var e = {
              fieldID: this.fieldID,
              classes: this.classes,
              currentValue: this.currentValue,
            };
            return nfRadio
              .channel("app")
              .request(
                "get:template",
                "#tmpl-nf-field-listcheckbox-other-text"
              )(e);
          }
        },
        getCalcValue: function (e) {
          var t = 0,
            i = e.get("options");
          return (
            0 != i.length &&
              _.each(e.get("value"), function (e) {
                var n = _.find(i, function (t) {
                  return t.value == e;
                });
                t = Number(t) + Number(n.calc);
              }),
            t
          );
        },
        beforeUpdateField: function (e, t) {
          var i = t.get("value") || [];
          "string" == typeof i && (i = [i]);
          var n = jQuery(e).val();
          if (jQuery(e).prop("checked"))
            i.push(n),
              jQuery(e).addClass("nf-checked"),
              jQuery(e)
                .parent()
                .find('label[for="' + jQuery(e).prop("id") + '"]')
                .addClass("nf-checked-label");
          else {
            jQuery(e).removeClass("nf-checked"),
              jQuery(e)
                .parent()
                .find('label[for="' + jQuery(e).prop("id") + '"]')
                .removeClass("nf-checked-label");
            var r = i.indexOf(n);
            if (-1 != r) i.splice(r, 1);
            else if (Array.isArray(i)) {
              var o = i[0].split(","),
                a = o.indexOf(n);
              -1 !== a && o.splice(a, 1), (i = o.join(","));
            }
          }
          return _.clone(i);
        },
      });
    }),
    i("controllers/fieldImageList", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("listimage"),
            "init:model",
            this.register
          ),
            nfRadio
              .channel("listimage")
              .reply("before:updateField", this.beforeUpdateField, this),
            nfRadio
              .channel("listimage")
              .reply("get:calcValue", this.getCalcValue, this);
        },
        register: function (e) {
          if (
            (e.set("renderOptions", this.renderOptions),
            e.set("renderOtherText", this.renderOtherText),
            e.set("selected", []),
            0 != e.get("image_options").length)
          ) {
            var t = _.filter(e.get("image_options"), function (e) {
              return 1 == e.selected;
            });
            t = _.map(t, function (e) {
              return e.value;
            });
          }
          var i = e.get("value");
          void 0 !== i && Array.isArray(i)
            ? e.set("value", i)
            : void 0 !== t && e.set("value", t);
        },
        renderOptions: function () {
          var e = "";
          if (
            "" == this.value ||
            (Array.isArray(this.value) && 0 < this.value.length) ||
            0 < this.value.length
          )
            var t = !0;
          else t = !1;
          1 === this.allow_multi_select
            ? ((this.old_classname = "list-checkbox"),
              (this.image_type = "checkbox"))
            : (this.image_type = "radio"),
            "horizontal" === this.list_orientation
              ? (this.flex_direction = "row")
              : (this.flex_direction = "column");
          var i = this,
            n = parseInt(this.num_columns) || 1,
            r = 1,
            o = 1;
          if (
            (_.each(
              this.image_options,
              function (a, l) {
                this.show_option_labels
                  ? (a.label =
                      void 0 !== nfFrontEnd.filter_esc_status &&
                      "true" === nfFrontEnd.filter_esc_status
                        ? _.escape(a.label)
                        : a.label)
                  : (a.label = ""),
                  Array.isArray(this.value) &&
                    ((Array.isArray(this.value[0]) &&
                      -1 !== _.indexOf(this.value[0], a.value)) ||
                      _.indexOf(this.value, a.value)) &&
                    (t = !0),
                  a.value == this.value && (t = !0),
                  void 0 === a.visible && (a.visible = !0),
                  "horizontal" === i.list_orientation &&
                    r <= n &&
                    ((a.styles =
                      "margin:auto;grid-column: " + r + "; grid-row = " + o),
                    r === n ? ((r = 1), (o += 1)) : (r += 1)),
                  (a.image_type = i.image_type),
                  (a.fieldID = this.id),
                  (a.classes = this.classes),
                  (a.index = l);
                var s = !1;
                Array.isArray(this.value) && 0 < this.value.length
                  ? (-1 === _.indexOf(this.value[0].split(","), a.value) &&
                      -1 === _.indexOf(this.value, a.value)) ||
                    (s = !0)
                  : ((_.isArray(this.value) || a.value != this.value) &&
                      (1 != a.selected ||
                        !this.clean ||
                        (void 0 !== this.value && "" !== this.value))) ||
                    (s = !0),
                  (a.selected = s),
                  (a.isSelected = s),
                  (a.required = this.required),
                  (a.maybeFilterHTML = this.maybeFilterHTML);
                var d = nfRadio
                  .channel("app")
                  .request("get:template", "#tmpl-nf-field-listimage-option");
                e += d(a);
              },
              this
            ),
            1 == this.show_other)
          ) {
            "nf-other" == this.value && (t = !1);
            var a = {
                fieldID: this.id,
                classes: this.classes,
                value: this.value,
                currentValue: this.value,
                renderOtherText: this.renderOtherText,
                valueFound: t,
              },
              l = nfRadio
                .channel("app")
                .request("get:template", "#tmpl-nf-field-listimage-other");
            e += l(a);
          }
          return e;
        },
        renderOtherText: function () {
          if ("nf-other" == this.currentValue || !this.valueFound) {
            "nf-other" == this.currentValue && (this.currentValue = "");
            var e = {
              fieldID: this.fieldID,
              classes: this.classes,
              currentValue: this.currentValue,
            };
            return nfRadio
              .channel("app")
              .request(
                "get:template",
                "#tmpl-nf-field-listimage-other-text"
              )(e);
          }
        },
        getCalcValue: function (e) {
          var t = 0,
            i = e.get("options");
          if (0 != i.length)
            if (1 == parseInt(e.get("allow_multi_select")))
              _.each(e.get("value"), function (e) {
                var n = _.find(i, function (t) {
                  return t.value == e;
                });
                t += Number(n.calc);
              });
            else {
              var n = _.find(i, function (t) {
                return e.get("value") == t.value;
              });
              void 0 !== n && (t = n.calc);
            }
          return t;
        },
        beforeUpdateField: function (e, t) {
          if (1 !== t.get("allow_multi_select")) {
            var i = jQuery(e).val(),
              n = t.get("image_options");
            _.each(n, function (e, t) {
              e.value === i
                ? ((e.isSelected = !0), (e.selected = !0))
                : ((e.isSelected = !1), (e.selected = !1)),
                e.isSelected
                  ? (jQuery("#nf-field-" + e.fieldID + "-" + t).addClass(
                      "nf-checked"
                    ),
                    jQuery("#nf-label-field-" + e.fieldID + "-" + t).addClass(
                      "nf-checked-label"
                    ))
                  : ((e.selected = !1),
                    jQuery("#nf-field-" + e.fieldID + "-" + t).removeClass(
                      "nf-checked"
                    ),
                    jQuery(
                      "#nf-label-field-" + e.fieldID + "-" + t
                    ).removeClass("nf-checked-label"));
            });
          } else {
            "string" == typeof (i = t.get("value") || []) && (i = [i]);
            var r = jQuery(e).val();
            if (jQuery(e).prop("checked"))
              i.push(r),
                jQuery(e).addClass("nf-checked"),
                jQuery(e)
                  .parent()
                  .find('label[for="' + jQuery(e).prop("id") + '"]')
                  .addClass("nf-checked-label");
            else {
              jQuery(e).removeClass("nf-checked"),
                jQuery(e)
                  .parent()
                  .find('label[for="' + jQuery(e).prop("id") + '"]')
                  .removeClass("nf-checked-label");
              var o = i.indexOf(r);
              if (-1 != o) i.splice(o, 1);
              else if (Array.isArray(i)) {
                var a = i[0].split(","),
                  l = a.indexOf(r);
                -1 !== l && a.splice(l, 1), (i = a.join(","));
              }
            }
          }
          return _.clone(i);
        },
      });
    }),
    i("controllers/fieldRadio", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("listradio"),
            "change:modelValue",
            this.changeModelValue
          ),
            this.listenTo(
              nfRadio.channel("listradio"),
              "init:model",
              this.register
            ),
            nfRadio
              .channel("listradio")
              .reply("get:calcValue", this.getCalcValue, this),
            this.listenTo(
              nfRadio.channel("listradio"),
              "change:field",
              this.updateCheckedClass,
              this
            );
        },
        register: function (e) {
          if (
            (e.set("renderOptions", this.renderOptions),
            e.set("renderOtherText", this.renderOtherText),
            0 != e.get("options").length)
          ) {
            var t = _.find(e.get("options"), function (e) {
              return 1 == e.selected;
            });
            void 0 !== t && e.set("value", t.value);
          }
        },
        changeModelValue: function (e) {
          1 == e.get("show_other") && e.trigger("reRender");
        },
        renderOptions: function () {
          var e = "";
          if ("" == this.value) var t = !0;
          else t = !1;
          if (
            (_.each(
              this.options,
              function (i, n) {
                i.value == this.value && (t = !0),
                  void 0 === i.visible && (i.visible = !0),
                  (i.selected = !1),
                  (i.fieldID = this.id),
                  (i.classes = this.classes),
                  (i.currentValue = this.value),
                  (i.index = n),
                  (i.label =
                    void 0 !== nfFrontEnd.filter_esc_status &&
                    "true" === nfFrontEnd.filter_esc_status
                      ? _.escape(i.label)
                      : i.label),
                  (i.required = this.required),
                  (this.clean && 1 == this.selected) || this.value == i.value
                    ? (i.selected = !0)
                    : (i.selected = !1),
                  (i.maybeFilterHTML = this.maybeFilterHTML);
                var r = nfRadio
                  .channel("app")
                  .request("get:template", "#tmpl-nf-field-listradio-option");
                e += r(i);
              },
              this
            ),
            1 == this.show_other)
          ) {
            "nf-other" == this.value && (t = !1);
            var i = {
                fieldID: this.id,
                classes: this.classes,
                currentValue: this.value,
                renderOtherText: this.renderOtherText,
                valueFound: t,
              },
              n = nfRadio
                .channel("app")
                .request("get:template", "#tmpl-nf-field-listradio-other");
            e += n(i);
          }
          return e;
        },
        renderOtherText: function () {
          if ("nf-other" == this.currentValue || !this.valueFound) {
            "nf-other" == this.currentValue && (this.currentValue = "");
            var e = {
              fieldID: this.fieldID,
              classes: this.classes,
              currentValue: this.currentValue,
            };
            return nfRadio
              .channel("app")
              .request(
                "get:template",
                "#tmpl-nf-field-listradio-other-text"
              )(e);
          }
        },
        getCalcValue: function (e) {
          var t = 0;
          if (0 != e.get("options").length) {
            var i = _.find(e.get("options"), function (t) {
              return e.get("value") == t.value;
            });
            void 0 !== i && (t = i.calc);
          }
          return t;
        },
        updateCheckedClass: function (e, t) {
          jQuery('[name="' + jQuery(e).attr("name") + '"]').removeClass(
            "nf-checked"
          ),
            jQuery(e)
              .closest("ul")
              .find("label")
              .removeClass("nf-checked-label"),
            jQuery(e).addClass("nf-checked"),
            jQuery(e)
              .closest("li")
              .find('label[for="' + jQuery(e).prop("id") + '"]')
              .addClass("nf-checked-label");
        },
      });
    }),
    i("controllers/fieldNumber", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("number"),
            "init:model",
            this.maybeMinDefault
          ),
            this.listenTo(
              nfRadio.channel("number"),
              "keyup:field",
              this.validateMinMax
            );
        },
        maybeMinDefault: function (e) {
          if ("" == e.get("value") && "" == e.get("placeholder")) {
            var t = e.get("num_min");
            e.set("placeholder", t);
          }
        },
        validateMinMax: function (e, t) {
          var i = jQuery(e),
            n = parseFloat(i.val()),
            r = i.attr("min"),
            o = i.attr("max"),
            a = parseFloat(i.attr("step"));
          if (r && n < r) {
            var l = nfRadio.channel("fields").request("get:field", t.get("id")),
              s = nfRadio.channel("app").request("get:form", l.get("formID"));
            nfRadio
              .channel("fields")
              .request(
                "add:error",
                t.get("id"),
                "number-min",
                s.get("settings").fieldNumberNumMinError
              );
          } else
            nfRadio
              .channel("fields")
              .request("remove:error", t.get("id"), "number-min");
          if (o && n > o) {
            (l = nfRadio.channel("fields").request("get:field", t.get("id"))),
              (s = nfRadio.channel("app").request("get:form", l.get("formID")));
            nfRadio
              .channel("fields")
              .request(
                "add:error",
                t.get("id"),
                "number-max",
                s.get("settings").fieldNumberNumMaxError
              );
          } else
            nfRadio
              .channel("fields")
              .request("remove:error", t.get("id"), "number-max");
          var d = Math.round(1e9 * parseFloat(n)),
            c = Math.round(1e9 * parseFloat(a));
          if (n && 0 != d % c) {
            (l = nfRadio.channel("fields").request("get:field", t.get("id"))),
              (s = nfRadio.channel("app").request("get:form", l.get("formID")));
            nfRadio
              .channel("fields")
              .request(
                "add:error",
                t.get("id"),
                "number-step",
                s.get("settings").fieldNumberIncrementBy + a
              );
          } else
            nfRadio
              .channel("fields")
              .request("remove:error", t.get("id"), "number-step");
        },
      });
    }),
    i("controllers/mirrorField", [], function () {
      var e = nfRadio.channel("fields");
      return Marionette.Object.extend({
        listeningModel: "",
        initialize: function () {
          this.listenTo(e, "init:model", this.registerMirror);
        },
        registerMirror: function (e) {
          if (e.get("mirror_field")) {
            this.listeningModel = e;
            var t = e.get("mirror_field");
            this.listenTo(
              nfRadio.channel("field-" + t),
              "change:modelValue",
              this.changeValue
            );
          }
        },
        changeValue: function (e) {
          this.listeningModel.set("value", e.get("value")),
            this.listeningModel.trigger("reRender");
        },
      });
    }),
    i("controllers/confirmField", [], function () {
      var e = nfRadio.channel("fields"),
        t = "confirm-mismatch";
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(e, "init:model", this.registerConfirm),
            this.listenTo(e, "keyup:field", this.confirmKeyup);
        },
        registerConfirm: function (e) {
          e.get("confirm_field") &&
            this.listenTo(nfRadio.channel("form"), "loaded", function (t) {
              this.registerConfirmListeners(e);
            });
        },
        registerConfirmListeners: function (e) {
          var t = nfRadio
            .channel("form-" + e.get("formID"))
            .request("get:fieldByKey", e.get("confirm_field"));
          void 0 !== t &&
            (t.set("confirm_with", e.get("id")),
            this.listenTo(
              nfRadio.channel("field-" + t.get("id")),
              "change:modelValue",
              this.changeValue
            ),
            this.listenTo(
              nfRadio.channel("field-" + e.get("id")),
              "change:modelValue",
              this.changeValue
            ));
        },
        changeValue: function (i) {
          if (void 0 === i.get("confirm_with"))
            var n = i,
              r = nfRadio
                .channel("form-" + i.get("formID"))
                .request("get:fieldByKey", n.get("confirm_field"));
          else (r = i), (n = e.request("get:field", r.get("confirm_with")));
          r.get("id");
          var o = n.get("id");
          if ("" == n.get("value") || n.get("value") == r.get("value"))
            nfRadio.channel("fields").request("remove:error", o, t);
          else {
            var a = nfRadio.channel("fields").request("get:field", o),
              l = nfRadio.channel("app").request("get:form", a.get("formID"));
            nfRadio
              .channel("fields")
              .request(
                "add:error",
                o,
                t,
                l.get("settings").confirmFieldErrorMsg
              );
          }
        },
        confirmKeyup: function (e, i, n) {
          var r = jQuery(e).val();
          if (i.get("confirm_field"))
            var o = i,
              a = i.get("id"),
              l = nfRadio
                .channel("form-" + i.get("formID"))
                .request("get:fieldByKey", o.get("confirm_field"))
                .get("value"),
              s = r;
          else if (i.get("confirm_with"))
            (a = (o = nfRadio
              .channel("fields")
              .request("get:field", i.get("confirm_with"))).get("id")),
              (l = s = o.get("value"));
          if (void 0 !== o)
            if ("" == s)
              nfRadio.channel("fields").request("remove:error", a, t);
            else if (r == l)
              nfRadio.channel("fields").request("remove:error", a, t);
            else {
              var d = nfRadio.channel("fields").request("get:field", a),
                c = nfRadio.channel("app").request("get:form", d.get("formID"));
              nfRadio
                .channel("fields")
                .request(
                  "add:error",
                  a,
                  t,
                  c.get("settings").confirmFieldErrorMsg
                );
            }
        },
      });
    }),
    i("controllers/updateFieldModel", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          nfRadio.channel("nfAdmin").reply("update:field", this.updateField);
        },
        updateField: function (e, t) {
          e.get("isUpdated") ||
            (e.set("value", t),
            e.set("isUpdated", !0),
            _.isArray(t) && e.trigger("change:value", e));
        },
      });
    }),
    i("controllers/submitButton", ["controllers/submitButton"], function (e) {
      return Marionette.Object.extend({
        bound: {},
        initialize: function () {
          this.listenTo(
            nfRadio.channel("submit"),
            "init:model",
            this.registerHandlers
          );
        },
        registerHandlers: function (e) {
          if (void 0 !== this.bound[e.get("id")]) return !1;
          this.listenTo(
            nfRadio.channel("field-" + e.get("id")),
            "click:field",
            this.click,
            this
          ),
            e.listenTo(
              nfRadio.channel("form-" + e.get("formID")),
              "before:submit",
              this.beforeSubmit,
              e
            ),
            e.listenTo(
              nfRadio.channel("form-" + e.get("formID")),
              "submit:failed",
              this.resetLabel,
              e
            ),
            e.listenTo(
              nfRadio.channel("form-" + e.get("formID")),
              "submit:response",
              this.resetLabel,
              e
            ),
            e.listenTo(
              nfRadio.channel("form-" + e.get("formID")),
              "enable:submit",
              this.maybeEnable,
              e
            ),
            e.listenTo(
              nfRadio.channel("form-" + e.get("formID")),
              "disable:submit",
              this.maybeDisable,
              e
            ),
            e.listenTo(
              nfRadio.channel("form-" + e.get("formID")),
              "processingLabel",
              this.processingLabel,
              e
            ),
            e.listenTo(
              nfRadio.channel("fields"),
              "add:error",
              this.maybeDisable,
              e
            ),
            e.listenTo(
              nfRadio.channel("fields"),
              "remove:error",
              this.maybeEnable,
              e
            ),
            (this.bound[e.get("id")] = !0);
        },
        click: function (e, t) {
          var i = nfRadio.channel("app").request("get:form", t.get("formID"));
          nfRadio.channel("form-" + t.get("formID")).request("submit", i);
        },
        beforeSubmit: function () {
          this.set("disabled", !0),
            nfRadio
              .channel("form-" + this.get("formID"))
              .trigger("processingLabel", this);
        },
        maybeDisable: function (e) {
          (void 0 !== e && e.get("formID") != this.get("formID")) ||
            (this.set("disabled", !0), this.trigger("reRender"));
        },
        maybeEnable: function (e) {
          if (void 0 !== e && e.get("formID") != this.get("formID")) return !1;
          var t = nfRadio
            .channel("app")
            .request("get:form", this.get("formID"));
          0 == _.size(t.get("fieldErrors")) &&
            (this.set("disabled", !1), this.trigger("reRender"));
        },
        processingLabel: function () {
          if (this.get("label") == this.get("processing_label")) return !1;
          this.set("oldLabel", this.get("label")),
            this.set("label", this.get("processing_label")),
            this.trigger("reRender");
        },
        resetLabel: function (e) {
          (void 0 !== e.errors &&
            void 0 !== e.errors.nonce &&
            _.size(e.errors.nonce) > 0 &&
            void 0 !== e.errors.nonce.new_nonce &&
            void 0 !== e.errors.nonce.nonce_ts) ||
            (void 0 !== this.get("oldLabel") &&
              this.set("label", this.get("oldLabel")),
            this.set("disabled", !1),
            this.trigger("reRender"));
        },
      });
    }),
    i("controllers/submitDebug", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("forms"),
            "submit:response",
            this.submitDebug
          );
        },
        submitDebug: function (e, t, i, n) {
          if (void 0 !== e.debug) {
            if (void 0 !== e.debug.form) {
              var r = document.createElement("span");
              _.each(e.debug.form, function (e, t) {
                var i = document.createTextNode(e);
                r.appendChild(i), r.appendChild(document.createElement("br"));
              }),
                jQuery(".nf-debug-msg").html(r);
            }
            if (void 0 !== e.debug.console) {
              console.log("%c%s", "", "NINJA SUPPORT"),
                _.each(e.debug.console, function (e, t) {
                  console.log(e);
                }),
                console.log("%c%s", "", "END NINJA SUPPORT");
            }
          }
        },
      });
    }),
    i("controllers/getFormErrors", [], function () {
      nfRadio.channel("fields");
      return Marionette.Object.extend({
        initialize: function (e) {
          nfRadio.channel("form").reply("get:errors", this.getFormErrors);
        },
        getFormErrors: function (e) {
          var t = nfRadio.channel("app").request("get:form", e),
            i = !1;
          return (
            t &&
              (0 !== t.get("errors").length &&
                _.each(t.get("errors").models, function (e) {
                  (i = i || {})[e.get("id")] = e.get("msg");
                }),
              _.each(t.get("fields").models, function (e) {
                "submit" != e.get("type") &&
                  e.get("errors").length > 0 &&
                  ((i = i || {})[e.get("id")] = e.get("errors"));
              })),
            i
          );
        },
      });
    }),
    i("controllers/validateRequired", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("fields"),
            "blur:field",
            this.validateRequired
          ),
            this.listenTo(
              nfRadio.channel("fields"),
              "change:field",
              this.validateRequired
            ),
            this.listenTo(
              nfRadio.channel("fields"),
              "keyup:field",
              this.validateKeyup
            ),
            this.listenTo(
              nfRadio.channel("fields"),
              "change:modelValue",
              this.validateModelData
            ),
            this.listenTo(
              nfRadio.channel("submit"),
              "validate:field",
              this.validateModelData
            );
        },
        validateKeyup: function (e, t, i) {
          if (1 != t.get("required")) return !1;
          t.get("clean") || this.validateRequired(e, t);
        },
        validateRequired: function (e, t) {
          if (1 != t.get("required") || !t.get("visible")) return !1;
          var i = jQuery(e).val(),
            n = nfRadio
              .channel(t.get("type"))
              .request("validate:required", e, t),
            r = !0,
            o = t.get("mask");
          if (
            (o &&
              (o = (o = (o = o.replace(/9/g, "_")).replace(/a/g, "_")).replace(
                /\*/g,
                "_"
              )),
            o && i === o && 0 < t.get("errors").length && (r = !1),
            jQuery.trim(i) || (r = !1),
            void 0 !== n)
          )
            var a = n;
          else a = r;
          this.maybeError(a, t);
        },
        validateModelData: function (e) {
          if (1 != e.get("required") || !e.get("visible") || e.get("clean"))
            return !1;
          if (e.get("errors").get("required-error")) return !1;
          currentValue = e.get("value");
          var t = !0;
          jQuery.trim(currentValue) || (t = !1);
          var i = nfRadio
            .channel(e.get("type"))
            .request("validate:modelData", e);
          if (void 0 !== i) var n = i;
          else n = t;
          this.maybeError(n, e);
        },
        maybeError: function (e, t) {
          if (e)
            nfRadio
              .channel("fields")
              .request("remove:error", t.get("id"), "required-error");
          else {
            var i = nfRadio
              .channel("form-" + t.get("formID"))
              .request("get:form");
            void 0 !== i &&
              nfRadio
                .channel("fields")
                .request(
                  "add:error",
                  t.get("id"),
                  "required-error",
                  i.get("settings").validateRequiredField
                );
          }
        },
      });
    }),
    i("controllers/submitError", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("forms"),
            "submit:response",
            this.submitErrors
          );
        },
        submitErrors: function (e, t, i, n) {
          if (
            _.size(e.errors.nonce) > 0 &&
            void 0 !== e.errors.nonce.new_nonce &&
            void 0 !== e.errors.nonce.nonce_ts
          ) {
            (nfFrontEnd.ajaxNonce = e.errors.nonce.new_nonce),
              (nfFrontEnd.nonce_ts = e.errors.nonce.nonce_ts);
            var r = nfRadio.channel("app").request("get:form", n);
            nfRadio.channel("form-" + n).request("submit", r);
          }
          if (
            (_.size(e.errors.fields) > 0 &&
              _.each(e.errors.fields, function (e, t) {
                "object" == typeof e
                  ? nfRadio
                      .channel("fields")
                      .request("add:error", t, e.slug, e.message)
                  : nfRadio
                      .channel("fields")
                      .request("add:error", t, "required-error", e);
              }),
            _.size(e.errors.form) > 0 &&
              _.each(e.errors.form, function (e, t) {
                nfRadio.channel("form-" + n).request("remove:error", t),
                  nfRadio.channel("form-" + n).request("add:error", t, e);
              }),
            void 0 !== e.errors.last && void 0 !== e.errors.last.message)
          ) {
            var o =
              "background: rgba( 255, 207, 115, .5 ); color: #FFA700; display: block;";
            console.log("%c NINJA FORMS SUPPORT: SERVER ERROR", o),
              console.log(e.errors.last.message),
              console.log("%c END SERVER ERROR MESSAGE", o);
          }
          jQuery("#nf-form-" + n + "-cont .nf-field-container").show();
        },
      });
    }),
    i("controllers/actionRedirect", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("forms"),
            "submit:response",
            this.actionRedirect
          );
        },
        actionRedirect: function (e) {
          void 0 !== e.data.halt &&
            void 0 !== e.data.halt.redirect &&
            "" != e.data.halt.redirect &&
            (window.location = e.data.halt.redirect),
            0 == _.size(e.errors) &&
              void 0 !== e.data.actions &&
              void 0 !== e.data.actions.redirect &&
              "" != e.data.actions.redirect &&
              (window.location = e.data.actions.redirect);
        },
      });
    }),
    i("controllers/actionSuccess", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("forms"),
            "submit:response",
            this.actionSubmit
          );
        },
        actionSubmit: function (e) {
          if (
            0 == _.size(e.errors) &&
            void 0 !== e.data.actions &&
            void 0 !== e.data.actions.success_message &&
            "" != e.data.actions.success_message
          ) {
            var t = e.data.form_id,
              i = jQuery("#nf-form-" + t + "-cont .nf-response-msg");
            i.html(e.data.actions.success_message).show();
            var n = i.offset().top,
              r = i.offset().top + i.outerHeight(),
              o = jQuery(window).scrollTop() + jQuery(window).height(),
              a = jQuery(window).scrollTop();
            (o > r && a < n) ||
              jQuery("html, body").animate(
                { scrollTop: i.offset().top - 50 },
                300
              );
          }
        },
      });
    }),
    i("controllers/fieldSelect", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("fields"),
            "init:model",
            function (e) {
              "list" == e.get("parentType") && this.register(e);
            },
            this
          ),
            nfRadio
              .channel("listselect")
              .reply("get:calcValue", this.getCalcValue, this),
            nfRadio
              .channel("listmultiselect")
              .reply("get:calcValue", this.getCalcValue, this);
        },
        register: function (e) {
          if (
            (e.set("renderOptions", this.renderOptions),
            e.set("renderOtherAttributes", this.renderOtherAttributes),
            0 != e.get("options").length)
          ) {
            var t = e.get("value");
            if ("listmultiselect" == e.get("type"))
              var i = _.filter(e.get("options"), function (e) {
                  return 1 == e.selected;
                }),
                n = (i = _.map(i, function (e) {
                  return e.value;
                }));
            else if ("listradio" !== e.get("type")) {
              if (
                (void 0 ===
                  (i = _.find(e.get("options"), function (e) {
                    return 1 == e.selected;
                  })) && (i = _.first(e.get("options"))),
                void 0 !== i && void 0 !== i.value)
              )
                n = i.value;
              else if (void 0 !== i) n = i.label;
            }
            void 0 !== t && "" !== t && Array.isArray(t)
              ? e.set("value", t)
              : void 0 !== i && e.set("value", n);
          }
        },
        renderOptions: function () {
          var e = "";
          return (
            _.each(
              this.options,
              function (t) {
                if (_.isArray(this.value)) {
                  if (
                    "listmultiselect" === this.type &&
                    0 < this.value.length &&
                    -1 != _.indexOf(this.value[0].split(","), t.value)
                  )
                    var i = !0;
                  else if (-1 != _.indexOf(this.value, t.value)) i = !0;
                } else if (_.isArray(this.value) || t.value != this.value)
                  if (1 == t.selected && this.clean && void 0 === this.value)
                    i = !0;
                  else i = !1;
                else var i = !0;
                void 0 === t.visible && (t.visible = !0),
                  (t.selected = i),
                  (t.fieldID = this.id),
                  (t.classes = this.classes),
                  (t.currentValue = this.value),
                  (t.label =
                    void 0 !== nfFrontEnd.filter_esc_status &&
                    "true" === nfFrontEnd.filter_esc_status
                      ? _.escape(t.label)
                      : t.label),
                  (t.maybeFilterHTML = this.maybeFilterHTML);
                var n = nfRadio
                  .channel("app")
                  .request("get:template", "#tmpl-nf-field-listselect-option");
                e += n(t);
              },
              this
            ),
            e
          );
        },
        renderOtherAttributes: function () {
          var e = "";
          "listmultiselect" == this.type &&
            (e = (e += " multiple") + ' size="' + (this.multi_size || 5) + '"');
          return e;
        },
        getCalcValue: function (e) {
          var t = 0,
            i = e.get("options");
          if (0 != i.length)
            if ("listmultiselect" == e.get("type"))
              _.each(e.get("value"), function (e) {
                var n = _.find(i, function (t) {
                  return t.value == e;
                });
                t += Number(n.calc);
              });
            else {
              var n = _.find(i, function (t) {
                return e.get("value") == t.value;
              });
              void 0 === n && (n = e.get("options")[0]), (t = n.calc);
            }
          return t;
        },
      });
    }),
    i("controllers/coreSubmitResponse", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("forms"),
            "submit:response",
            this.actionSubmit
          );
        },
        actionSubmit: function (e) {
          var t = nfRadio.channel("app").request("get:form", e.data.form_id);
          if (0 != _.size(e.errors)) return !1;
          1 == e.data.settings.clear_complete &&
            (t.get("fields").reset(t.get("loadedFields")),
            1 != e.data.settings.hide_complete &&
              nfRadio.channel("captcha").trigger("reset")),
            1 == e.data.settings.hide_complete && t.trigger("hide");
        },
      });
    }),
    i("controllers/fieldProduct", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("product"),
            "init:model",
            this.register
          ),
            nfRadio
              .channel("product")
              .reply("get:calcValue", this.getCalcValue, this);
        },
        register: function (e) {
          e.set("renderProductQuantity", this.renderProductQuantity),
            e.set("renderProduct", this.renderProduct),
            e.set("renderOptions", this.renderOptions);
        },
        renderProduct: function () {
          switch (this.product_type) {
            case "user":
              return nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-field-textbox"
                )(this);
            case "hidden":
              return nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-field-hidden"
                )(this);
            case "dropdown":
              return nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-product-dropdown"
                )(this);
            default:
              return nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-product-single"
                )(this);
          }
        },
        renderProductQuantity: function () {
          if (1 == this.product_use_quantity)
            return nfRadio
              .channel("app")
              .request(
                "get:template",
                "#tmpl-nf-product-quantity"
              )(this);
        },
        renderOptions: function () {
          var e = this,
            t = "";
          return (
            _.each(this.options, function (i) {
              if (1 == i.selected) var n = !0;
              else n = !1;
              (i.selected = n),
                (i.fieldID = e.id),
                (i.classes = e.classes),
                (i.currentValue = e.value);
              var r = nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-product-" + e.product_type + "-option"
                );
              t += r(i);
            }),
            t
          );
        },
        getCalcValue: function (e) {
          return e.get("product_price") * e.get("value");
        },
      });
    }),
    i("controllers/fieldTotal", [], function () {
      return Marionette.Object.extend({
        totalModel: {},
        productTotals: {},
        initialize: function () {
          this.listenTo(nfRadio.channel("total"), "init:model", this.register),
            this.listenTo(
              nfRadio.channel("shipping"),
              "init:model",
              this.registerShipping
            );
        },
        register: function (e) {
          this.totalModel = e;
          var t = e.get("formID");
          this.listenTo(
            nfRadio.channel("form-" + t),
            "loaded",
            this.onFormLoaded
          ),
            this.listenTo(
              nfRadio.channel("product"),
              "change:modelValue",
              this.onChangeProduct
            ),
            this.listenTo(
              nfRadio.channel("quantity"),
              "change:modelValue",
              this.onChangeQuantity
            );
        },
        registerShipping: function (e) {
          this.shippingCost = e.get("shipping_cost");
        },
        onFormLoaded: function (e) {
          var t = e.get("fields").models,
            i = {},
            n = {};
          for (var r in t) {
            var o = t[r],
              a = o.get("id");
            if ("product" == o.get("type")) i[a] = o;
            else if ("quantity" == o.get("type")) {
              n[(l = o.get("product_assignment"))] = o;
            }
          }
          for (var l in i) {
            var s = i[l],
              d = Number(s.get("product_price"));
            n[l]
              ? (d *= n[l].get("value"))
              : 1 == s.get("product_use_quantity") && (d *= s.get("value")),
              (this.productTotals[l] = d);
          }
          this.updateTotal();
        },
        onChangeProduct: function (e) {
          var t = e.get("id"),
            i = Number(e.get("product_price")),
            n = Number(e.get("value")) * i;
          (this.productTotals[t] = n), this.updateTotal();
        },
        onChangeQuantity: function (e) {
          var t = e.get("product_assignment"),
            i = nfRadio.channel("fields").request("get:field", t),
            n = Number(i.get("product_price")),
            r = Number(e.get("value")) * n;
          (this.productTotals[t] = r), this.updateTotal();
        },
        updateTotal: function () {
          var e = 0;
          for (var t in this.productTotals) e += Number(this.productTotals[t]);
          e && this.shippingCost && (e += Number(this.shippingCost)),
            this.totalModel.set("value", e.toFixed(2)),
            this.totalModel.trigger("reRender");
        },
      });
    }),
    i("controllers/fieldQuantity", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("quantity"),
            "init:model",
            this.registerQuantity
          );
        },
        registerQuantity: function (e) {
          var t = e.get("product_assignment"),
            i = nfRadio.channel("fields").request("get:field", t);
          i && i.set("product_use_quantity", 0);
        },
      });
    }),
    i("models/calcModel", [], function () {
      return Backbone.Model.extend({
        initialize: function () {
          this.set("formID", this.collection.options.formModel.get("id")),
            this.set("fields", {}),
            nfRadio.channel("calc").trigger("init:model", this),
            this.on("change:value", this.changeValue, this);
        },
        changeField: function (e) {
          nfRadio.channel("calc").trigger("change:field", this, e);
        },
        changeCalc: function (e) {
          nfRadio.channel("calc").trigger("change:calc", this, e);
        },
        changeValue: function () {
          nfRadio.channel("calc").trigger("change:value", this);
        },
      });
    }),
    i("models/calcCollection", ["models/calcModel"], function (e) {
      return Backbone.Collection.extend({
        model: e,
        comparator: "order",
        initialize: function (e, t) {
          (this.options = t),
            _.each(e, function (e) {
              void 0 !== e.dec &&
                ("" === e.dec.toString().trim() && (e.dec = 2),
                (e.dec = parseInt(e.dec)));
            }),
            nfRadio
              .channel("form-" + t.formModel.get("id"))
              .reply("get:calc", this.getCalc, this);
        },
        getCalc: function (e) {
          return this.findWhere({ name: e });
        },
      });
    }),
    i("controllers/calculations", ["models/calcCollection"], function (e) {
      return Marionette.Object.extend({
        initialize: function () {
          (this.calcs = {}),
            (this.displayFields = {}),
            this.listenTo(
              nfRadio.channel("form"),
              "loaded",
              this.registerCalcs
            ),
            this.listenTo(
              nfRadio.channel("fields"),
              "reset:collection",
              this.resetCalcs
            ),
            this.listenTo(
              nfRadio.channel("calc"),
              "change:field",
              this.changeField
            ),
            this.listenTo(
              nfRadio.channel("calc"),
              "change:calc",
              this.changeCalc
            );
          var e = this;
          _.each(nfFrontEnd.use_merge_tags.calculations, function (t) {
            e.listenTo(
              nfRadio.channel("fields-" + t),
              "init:model",
              e.initDisplayField
            );
          }),
            this.listenTo(
              nfRadio.channel("calc"),
              "change:value",
              this.updateDisplayFields
            ),
            (this.init = {});
        },
        resetCalcs: function (e) {
          void 0 !== e.options.formModel &&
            this.registerCalcs(e.options.formModel);
        },
        registerCalcs: function (t) {
          var i = new e(t.get("settings").calculations, { formModel: t });
          this.calcs[t.get("id")] = i;
          var n = this;
          _.each(i.models, function (e) {
            (n.init[e.get("name")] = !0), n.setupCalc(e);
          });
        },
        setupCalc: function (e) {
          var t = this,
            i = e.get("eq"),
            n = i,
            r = (e.get("name"), i.match(new RegExp(/{field:(.*?)}/g)));
          r &&
            (r = r.map(function (i) {
              var r = i
                .replace(":calc}", "")
                .replace("}", "")
                .replace("{field:", "");
              if (
                ((fieldModel = nfRadio
                  .channel("form-" + e.get("formID"))
                  .request("get:fieldByKey", r)),
                "undefined" != typeof fieldModel)
              ) {
                fieldModel.set("clean", !1),
                  fieldModel.on("change:value", e.changeField, e);
                var o = t.getCalcValue(fieldModel);
                t.updateCalcFields(e, r, o),
                  (n = t.replaceKey("field", r, o, n));
              }
            }));
          var o = i.match(new RegExp(/{calc:(.*?)}/g));
          o &&
            (o = o.map(function (i) {
              var r = i.replace("}", "").replace("{calc:", ""),
                o = e.collection.findWhere({ name: r });
              if (void 0 !== o) {
                o.on("change:value", e.changeCalc, e);
                var a = o.get("value");
                n = t.replaceKey("calc", r, a, n);
              }
            })),
            (n = (n = n.replace(/{([a-zA-Z0-9]|:|_|-)*}/g, 0)).replace(
              /\r?\n|\r/g,
              ""
            ));
          try {
            this.debug(
              "Calculation Decoder " +
                n +
                " -> " +
                this.localeDecodeEquation(n) +
                " (Setup)"
            ),
              e.set(
                "value",
                Number(mexp.eval(this.localeDecodeEquation(n))).toFixed(
                  e.get("dec")
                )
              );
          } catch (e) {
            console.log(e);
          }
          "NaN" === e.get("value") && e.set("value", "0");
        },
        updateCalcFields: function (e, t, i) {
          var n = e.get("fields");
          (n[t] = i), e.set("fields", n);
        },
        getCalcValue: function (e) {
          var t = nfRadio.channel(e.get("type")).request("get:calcValue", e),
            i = e.get("value");
          void 0 !== t && (t || 0 === t) && (i = t);
          var r = new n(
              nfi18n.siteLocale,
              nfi18n.thousands_sep,
              nfi18n.decimal_point
            ),
            o = r.numberDecoder(i),
            a = r.numberEncoder(i);
          return (
            (t = void 0 !== o && jQuery.isNumeric(o) ? a : 0),
            e.get("visible") || (t = 0),
            t
          );
        },
        replaceKey: function (e, t, i, n) {
          (n = n || calcModel.get("eq")), (tag = "{" + e + ":" + t + "}");
          var r = new RegExp(tag, "g");
          calcTag = "{" + e + ":" + t + ":calc}";
          var o = new RegExp(calcTag, "g");
          return (n = (n = n.replace(r, i)).replace(o, i));
        },
        replaceAllKeys: function (e) {
          var t = e.get("eq"),
            i = this;
          _.each(e.get("fields"), function (e, n) {
            t = i.replaceKey("field", n, e, t);
          });
          var n = t.match(new RegExp(/{calc:(.*?)}/g));
          return (
            n &&
              _.each(n, function (i) {
                var n = i.replace("}", "").replace("{calc:", ""),
                  r = e.collection.findWhere({ name: n });
                if (void 0 !== r) {
                  var o = new RegExp(i, "g");
                  t = t.replace(o, r.get("value"));
                }
              }),
            t
          );
        },
        changeField: function (e, t) {
          var i = t.get("key"),
            n = this.getCalcValue(t);
          this.updateCalcFields(e, i, n);
          var r = this.replaceAllKeys(e);
          r = (r = r.replace(/{([a-zA-Z0-9]|:|_|-)*}/g, "0")).replace(
            /\r?\n|\r/g,
            ""
          );
          try {
            this.debug(
              "Calculation Decoder " +
                r +
                " -> " +
                this.localeDecodeEquation(r) +
                " (Change Field)"
            ),
              e.set(
                "value",
                Number(mexp.eval(this.localeDecodeEquation(r))).toFixed(
                  e.get("dec")
                )
              );
          } catch (e) {
            this.debug() && console.log(e);
          }
          "NaN" === e.get("value") && e.set("value", "0");
        },
        initDisplayField: function (e) {
          if (e.get("default") && "string" == typeof e.get("default")) {
            var t = e.get("default").match(new RegExp(/{calc:(.*?)}/g));
            t &&
              _.each(
                t,
                function (t) {
                  (t = t
                    .replace("{calc:", "")
                    .replace("}", "")
                    .replace(":2", "")),
                    (this.displayFields[t] = this.displayFields[t] || []),
                    this.displayFields[t].push(e);
                },
                this
              );
          }
        },
        updateDisplayFields: function (e) {
          var t = this;
          void 0 !== this.displayFields[e.get("name")] &&
            _.each(this.displayFields[e.get("name")], function (i) {
              var n = "",
                r = (n =
                  "html" === i.get("type")
                    ? i.get("value")
                    : i.get("default")).match(
                  new RegExp(/<span data-key="calc:(.*?)<\/span>/g)
                );
              _.each(r, function (e) {
                var t =
                  "{" +
                  e
                    .replace('<span data-key="', "")
                    .replace(/">(.*?)<\/span>/, "") +
                  "}";
                n = n.replace(e, t);
              });
              var o = n.match(new RegExp(/{calc:(.*?)}/g));
              _.each(o, function (e) {
                var r = e
                    .replace("}", "")
                    .replace("{calc:", "")
                    .replace(":2", ""),
                  o = t.calcs[i.get("formID")].findWhere({ name: r }),
                  a = new RegExp(e, "g"),
                  l = o.get("value");
                void 0 !== l && (l = t.applyLocaleFormatting(l, o)),
                  (n =
                    "html" === i.get("type")
                      ? n.replace(
                          a,
                          '<span data-key="calc:' + r + '">' + l + "</span>"
                        )
                      : l);
              }),
                i.set("value", n),
                t.init[e.get("name")] || i.trigger("reRender"),
                (t.init[e.get("name")] = !1);
            });
        },
        getCalc: function (e, t) {
          return this.calcs[t].findWhere({ name: e });
        },
        changeCalc: function (e, t) {
          var i = this.replaceAllKeys(e);
          i = (i = i.replace("[", "").replace("]", "")).replace(
            /\r?\n|\r/g,
            ""
          );
          try {
            this.debug(
              "Calculation Decoder " +
                i +
                " -> " +
                this.localeDecodeEquation(i) +
                " (Change Calc)"
            ),
              e.set(
                "value",
                Number(mexp.eval(this.localeDecodeEquation(i))).toFixed(
                  e.get("dec")
                )
              );
          } catch (e) {
            console.log(e);
          }
          "NaN" === e.get("value") && e.set("value", "0");
        },
        applyLocaleFormatting: function (e, t) {
          return new n(
            nfi18n.siteLocale,
            nfi18n.thousands_sep,
            nfi18n.decimal_point
          ).numberEncoder(e, t.get("dec"));
        },
        localeDecodeEquation: function (e) {
          var t = "",
            i = "",
            r = /[0-9.,]/,
            o = new n(
              nfi18n.siteLocale,
              nfi18n.thousands_sep,
              nfi18n.decimal_point
            );
          return (
            (e = (e = e.replace(/\s/g, "")).replace(/&nbsp;/g, ""))
              .split("")
              .forEach(function (e) {
                r.test(e)
                  ? (i += e)
                  : (0 < i.length && ((t += o.numberDecoder(i)), (i = "")),
                    (t += e));
              }),
            0 < i.length && (t += o.numberDecoder(i)),
            t
          );
        },
        debug: function (e) {
          window.nfCalculationsDebug && console.log(e);
        },
      });
    }),
    i("controllers/dateBackwardsCompat", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            Backbone.Radio.channel("pikaday-bc"),
            "init",
            this.dateBackwardsCompat
          );
        },
        dateBackwardsCompat: function (e, t) {
          if (
            ((e.pikaday = {}),
            (e.pikaday._o = {}),
            nfRadio.channel("pikaday").trigger("init", e, t),
            void 0 !== e.pikaday._o.disableDayFn &&
              e.set("disable", [e.pikaday._o.disableDayFn]),
            void 0 !== e.pikaday._o.i18n || void 0 !== e.pikaday._o.firstDay)
          ) {
            let t = e.config.locale;
            void 0 !== e.pikaday._o.firstDay &&
              (t.firstDayOfWeek = e.pikaday._o.firstDay),
              void 0 !== e.pikaday._o.i18n &&
                (void 0 !== e.pikaday._o.i18n.weekdays &&
                  (t.weekdays.longhand = e.pikaday._o.i18n.weekdays),
                void 0 !== e.pikaday._o.i18n.weekdaysShort &&
                  (t.weekdays.shorthand = e.pikaday._o.i18n.weekdaysShort),
                void 0 !== e.pikaday._o.i18n.months &&
                  jQuery(".flatpickr-monthDropdown-months > option").each(
                    function () {
                      this.text = e.pikaday._o.i18n.months[this.value];
                    }
                  )),
              e.set("locale", t);
          }
          Object.keys(e.pikaday._o).length > 0 &&
            (console.log(
              "%cDeprecated Ninja Forms Pikaday custom code detected.",
              "color: Red; font-size: large"
            ),
            console.log(
              "You are using deprecated Ninja Forms Pikaday custom code. Support for this custom code will be removed in a future version of Ninja Forms. Please contact Ninja Forms support for more details."
            ));
        },
      });
    }),
    i("controllers/fieldDate", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("date"),
            "init:model",
            this.registerFunctions
          ),
            this.listenTo(
              nfRadio.channel("date"),
              "render:view",
              this.initDatepicker
            );
        },
        registerFunctions: function (e) {
          e.set("renderHourOptions", this.renderHourOptions),
            e.set("renderMinuteOptions", this.renderMinuteOptions),
            e.set("maybeRenderAMPM", this.maybeRenderAMPM),
            e.set("customClasses", this.customClasses),
            (e.getValue = this.getValue);
        },
        renderHourOptions: function () {
          return this.hours_options;
        },
        renderMinuteOptions: function () {
          return this.minutes_options;
        },
        maybeRenderAMPM: function () {
          if (void 0 !== this.hours_24 && 1 != this.hours_24)
            return '<div style="float:left;"><select class="ampm extra"><option value="am">AM</option><option value="pm">PM</option></select></div>';
        },
        initDatepicker: function (e) {
          e.model.set("el", e.el);
          var t = jQuery(e.el).find(".nf-element")[0];
          if (
            (e.listenTo(
              nfRadio.channel("form-" + e.model.get("formID")),
              "before:submit",
              this.beforeSubmit,
              e
            ),
            void 0 !== e.model.get("date_mode") &&
              "time_only" == e.model.get("date_mode"))
          )
            return jQuery(t).hide(), !1;
          var i = e.model.get("date_format");
          ("" != i && "default" != i) ||
            ((i = this.convertDateFormat(nfi18n.dateFormat)),
            e.model.set("date_format", i));
          var n = {
            classes: jQuery(t).attr("class"),
            placeholder: e.model.get("placeholder"),
            parseDate: function (e, t) {
              return moment(e, t, !0).toDate();
            },
            formatDate: function (e, t, i) {
              return moment(e).format(t);
            },
            dateFormat: i,
            altFormat: i,
            altInput: !0,
            ariaDateFormat: i,
            mode: "single",
            allowInput: !0,
            disableMobile: "true",
            locale: {
              months: {
                shorthand: nfi18n.monthsShort,
                longhand: nfi18n.months,
              },
              weekdays: {
                shorthand: nfi18n.weekdaysShort,
                longhand: nfi18n.weekdays,
              },
              firstDayOfWeek: nfi18n.startOfWeek,
            },
          };
          let r = nfRadio.channel("flatpickr").request("filter:settings", n, e);
          void 0 !== r && (n = r);
          var o = flatpickr(t, n);
          1 == e.model.get("date_default") &&
            (o.setDate(moment().format(i)),
            e.model.set("value", moment().format(i))),
            nfRadio.channel("pikaday-bc").trigger("init", o, e.model, e),
            nfRadio.channel("flatpickr").trigger("init", o, e.model, e);
        },
        beforeSubmit: function (e) {
          if ("date_only" == this.model.get("date_mode")) return !1;
          let t = jQuery(this.el).find(".hour").val(),
            i = jQuery(this.el).find(".minute").val(),
            n = jQuery(this.el).find(".ampm").val(),
            r = this.model.get("value"),
            o = !1;
          o = _.isObject(r) ? r.date : r;
          let a = { date: o, hour: t, minute: i, ampm: n };
          this.model.set("value", a);
        },
        getYearRange: function (e) {
          var t = e.get("year_range_start"),
            i = e.get("year_range_end");
          return t && i
            ? [t, i]
            : t
            ? [t, (i = t + 10)]
            : i
            ? [(t = i - 10), i]
            : 10;
        },
        getMinDate: function (e) {
          var t = e.get("year_range_start");
          return t ? new Date(t, 0, 1) : null;
        },
        getMaxDate: function (e) {
          var t = e.get("year_range_end");
          return t ? new Date(t, 11, 31) : null;
        },
        convertDateFormat: function (e) {
          return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e =
            (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e =
              (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e =
                e.replace("D", "ddd")).replace("d", "DD")).replace(
                "l",
                "dddd"
              )).replace("j", "D")).replace("N", "")).replace("S", "")).replace(
                "w",
                "d"
              )).replace("z", "")).replace("W", "W")).replace(
                "M",
                "MMM"
              )).replace("F", "MMMM")).replace("m", "MM")).replace(
                "n",
                "M"
              )).replace("t", "")).replace("L", "")).replace(
              "o",
              "YYYY"
            )).replace("Y", "YYYY")).replace("y", "YY")).replace(
              "a",
              ""
            )).replace("A", "")).replace("B", "")).replace("g", "")).replace(
              "G",
              ""
            )).replace("h", "")).replace("H", "")).replace("i", "")).replace(
              "s",
              ""
            )).replace("u", "")).replace("v", "")).replace("e", "")).replace(
            "I",
            ""
          )).replace("O", "")).replace("P", "")).replace("T", "")).replace(
            "Z",
            ""
          )).replace("c", "")).replace("r", "")).replace("u", ""));
        },
        customClasses: function (e) {
          return (
            "date_and_time" == this.date_mode && (e += " date-and-time"), e
          );
        },
        getValue: function () {
          if ("date_only" == this.get("date_mode")) return this.get("value");
          let e = this.get("el"),
            t = jQuery(e).find(".hour").val(),
            i = jQuery(e).find(".minute").val(),
            n = jQuery(e).find(".ampm").val(),
            r = this.get("value"),
            o = !1;
          o = _.isObject(r) ? r.date : r;
          let a = "";
          return (
            void 0 !== o && (a += o),
            void 0 !== t && void 0 !== i && (a += " " + t + ":" + i),
            void 0 !== n && (a += " " + n),
            a
          );
        },
      });
    }),
    i("controllers/fieldRecaptcha", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("recaptcha"),
            "init:model",
            this.initRecaptcha
          ),
            this.listenTo(
              nfRadio.channel("forms"),
              "submit:response",
              this.resetRecaptcha
            );
        },
        initRecaptcha: function (e) {
          nfRadio
            .channel("recaptcha")
            .reply("update:response", this.updateResponse, this, e.id);
        },
        updateResponse: function (e, t) {
          var i = nfRadio.channel("fields").request("get:field", t);
          i.set("value", e),
            nfRadio
              .channel("fields")
              .request("remove:error", i.get("id"), "required-error");
        },
        resetRecaptcha: function () {
          var e = 0;
          jQuery(".g-recaptcha").each(function () {
            try {
              grecaptcha.reset(e);
            } catch (e) {
              console.log("Notice: Error trying to reset grecaptcha.");
            }
            e++;
          });
        },
      });
    }),
    i("controllers/fieldRecaptchaV3", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("recaptcha_v3"),
            "init:model",
            this.initRecaptcha
          );
        },
        initRecaptcha: function (e) {
          const t = e.get("formID");
          try {
            nfRadio.channel("form-" + t).trigger("disable:submit", e),
              grecaptcha.ready(function () {
                grecaptcha
                  .execute(e.get("site_key"), { action: "register" })
                  .then(function (i) {
                    e.set("value", i),
                      nfRadio.channel("form-" + t).trigger("enable:submit", e);
                  });
              });
          } catch (t) {
            jQuery(document).on("nfFormReady", (t) => {
              let i,
                n = nf_check_recaptcha_consent();
              e.collection.models.forEach((e) => {
                "submit" === e.get("type") && (i = e.get("id"));
              }),
                nfRadio
                  .channel("fields")
                  .request(
                    "add:error",
                    i,
                    "recaptcha-v3-missing",
                    e.collection.options.formModel.get("settings")
                      .recaptchaConsentMissing
                  ),
                this.nf_build_default_consent_action(e, n.services, i, t);
            });
          }
        },
        nf_build_default_consent_action: function (e, t, i, n) {
          if (
            !((t.length <= 1 && t.includes("missing_cookie")) || t.length <= 0)
          ) {
            let r = document.createElement("div");
            r.setAttribute("id", "nf_recaptcha_consent_event"),
              (r.innerText +=
                e.collection.options.formModel.get(
                  "settings"
                ).recaptchaConsentEvent);
            let o = new CustomEvent("nf_consent_link", {
              detail: {
                services: t,
                element: r,
                submitFieldID: i,
                layoutView: n,
              },
            });
            document.dispatchEvent(o);
            const a = document.getElementsByClassName(
              "nf-error-recaptcha-v3-missing"
            );
            Array.prototype.slice.call(a).forEach((e) => {
              e.append(r);
            });
          }
        },
      });
    }),
    i("controllers/fieldHTML", [], function () {
      return Marionette.Object.extend({
        htmlFields: [],
        trackedMergeTags: [],
        initialize: function () {
          this.listenTo(
            Backbone.Radio.channel("fields-html"),
            "init:model",
            this.setupFieldMergeTagTracking
          );
        },
        setupFieldMergeTagTracking: function (e) {
          this.htmlFields.push(e);
          var t = e.get("formID");
          this.listenTo(
            nfRadio.channel("form-" + t),
            "init:model",
            function (t) {
              var i = e.get("default").match(new RegExp(/{field:(.*?)}/g));
              i &&
                (_.each(
                  i,
                  function (e) {
                    var i = e.replace("{field:", "").replace("}", ""),
                      n = t.get("fields").findWhere({ key: i });
                    void 0 !== n &&
                      (this.trackedMergeTags.push(n),
                      this.listenTo(
                        nfRadio.channel("field-" + n.get("id")),
                        "change:modelValue",
                        this.updateFieldMergeTags
                      ));
                  },
                  this
                ),
                this.updateFieldMergeTags());
            },
            this
          );
        },
        updateFieldMergeTags: function (e) {
          _.each(
            this.htmlFields,
            function (e) {
              var t = e.get("value");
              _.each(
                this.trackedMergeTags,
                function (e) {
                  var i = t.match(
                    new RegExp(/<span data-key="field:(.*?)<\/span>/g)
                  );
                  _.each(i, function (i) {
                    -1 < i.indexOf('data-key="field:' + e.get("key")) &&
                      (t = t.replace(i, "{field:" + e.get("key") + "}"));
                  });
                  var n = "{field:" + e.get("key") + "}";
                  t = t.replace(
                    n,
                    '<span data-key="field:' +
                      e.get("key") +
                      '">' +
                      e.getValue() +
                      "</span>"
                  );
                },
                this
              ),
                e.set("value", t),
                e.trigger("reRender");
            },
            this
          );
        },
      });
    }),
    i("controllers/helpText", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("form"),
            "render:view",
            this.initHelpText
          ),
            nfRadio.channel("form").reply("init:help", this.initHelpText);
        },
        initHelpText: function (e) {
          jQuery(e.el)
            .find(".nf-help")
            .each(function () {
              jQuery(this).jBox("Tooltip", {
                theme: "TooltipBorder",
                content: jQuery(this).data("text"),
              });
            });
        },
      });
    }),
    i("controllers/fieldTextbox", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          nfRadio
            .channel("textbox")
            .reply("get:calcValue", this.getCalcValue, this);
        },
        getCalcValue: function (e) {
          if ("currency" == e.get("mask")) {
            var t = nfRadio.channel("app").request("get:form", e.get("formID")),
              i = void 0 !== t ? t.get("currencySymbol") : "",
              n = jQuery("<textarea />").html(i).text();
            return e.get("value").replace(n, "");
          }
          return e.get("value");
        },
      });
    }),
    i("controllers/fieldTextareaRTE", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("textarea"),
            "render:view",
            this.initTextareaRTEs
          ),
            this.listenTo(
              nfRadio.channel("textarea"),
              "click:extra",
              this.clickExtra
            ),
            this.meta_image_frame,
            (this.currentContext = {}),
            void 0 !== jQuery.summernote &&
              (jQuery.summernote.options.icons = {
                align: "dashicons dashicons-editor-alignleft",
                alignCenter: "dashicons dashicons-editor-aligncenter",
                alignJustify: "dashicons dashicons-editor-justify",
                alignLeft: "dashicons dashicons-editor-alignleft",
                alignRight: "dashicons dashicons-editor-alignright",
                indent: "dashicons dashicons-editor-indent",
                outdent: "dashicons dashicons-editor-outdent",
                bold: "dashicons dashicons-editor-bold",
                caret: "dashicons dashicons-arrow-down",
                close: "dashicons dashicons-dismiss",
                code: "dashicons dashicons-editor-code",
                eraser: "dashicons dashicons-editor-removeformatting",
                italic: "dashicons dashicons-editor-italic",
                link: "dashicons dashicons-admin-links",
                unlink: "dashicons dashicons-editor-unlink",
                magic: "dashicons dashicons-editor-paragraph",
                minus: "dashicons dashicons-minus",
                orderedlist: "dashicons dashicons-editor-ol",
                redo: "dashicons dashicons-redo",
                square: "dashicons fa-square",
                table: "dashicons dashicons-editor-table",
                underline: "dashicons dashicons-editor-underline",
                undo: "dashicons dashicons-undo",
                unorderedlist: "dashicons dashicons-editor-ul",
              });
        },
        initTextareaRTEs: function (e) {
          if (1 != e.model.get("textarea_rte")) return !1;
          var t = this,
            i = [
              ["paragraphStyle", ["style"]],
              ["fontStyle", ["bold", "italic", "underline", "clear"]],
              ["lists", ["ul", "ol"]],
              ["paragraph", ["paragraph"]],
              ["customGroup", ["linkButton", "unlink"]],
              ["table", ["table"]],
              ["actions", ["undo", "redo"]],
            ];
          1 == e.model.get("textarea_media") &&
            0 != userSettings.uid &&
            i.push(["tools", ["mediaButton"]]),
            jQuery(e.el)
              .find(".nf-element")
              .summernote({
                toolbar: i,
                buttons: {
                  linkButton: function (e) {
                    return t.linkButton(e);
                  },
                  mediaButton: function (e) {
                    return t.mediaButton(e);
                  },
                },
                height: 150,
                codemirror: { theme: "monokai", lineNumbers: !0 },
                prettifyHtml: !0,
                callbacks: {
                  onChange: function (t) {
                    e.model.set("value", jQuery(this).summernote("code"));
                  },
                },
              });
          var n = jQuery(e.el)
            .find(".link-button")
            .next(".dropdown-menu")
            .find("button");
          n.replaceWith(function () {
            return jQuery("<div/>", {
              class: jQuery(n).attr("class"),
              html: this.innerHTML,
            });
          });
        },
        linkButton: function (e) {
          var t = this,
            i = jQuery.summernote.ui,
            n = nfRadio
              .channel("app")
              .request("get:template", "#tmpl-nf-rte-link-button"),
            r = nfRadio
              .channel("app")
              .request("get:template", "#tmpl-nf-rte-link-dropdown");
          return i
            .buttonGroup([
              i.button({
                className: "dropdown-toggle link-button",
                contents: n({}),
                tooltip: nfi18n.fieldTextareaRTEInsertLink,
                click: function (i) {
                  t.clickLinkButton(i, e);
                },
                data: { toggle: "dropdown" },
              }),
              i.dropdown([
                i.buttonGroup({
                  children: [i.button({ contents: r({}), tooltip: "" })],
                }),
              ]),
            ])
            .render();
        },
        mediaButton: function (e) {
          var t = this,
            i = jQuery.summernote.ui,
            n = nfRadio
              .channel("app")
              .request("get:template", "#tmpl-nf-rte-media-button");
          return i
            .button({
              className: "dropdown-toggle",
              contents: n({}),
              tooltip: nfi18n.fieldTextareaRTEInsertMedia,
              click: function (i) {
                t.openMediaManager(i, e);
              },
            })
            .render();
        },
        openMediaManager: function (e, t) {
          if ((t.invoke("editor.saveRange"), this.meta_image_frame))
            this.meta_image_frame.open();
          else {
            this.meta_image_frame = wp.media.frames.meta_image_frame = wp.media(
              {
                title: nfi18n.fieldTextareaRTESelectAFile,
                button: { text: "insert" },
              }
            );
            var i = this;
            this.meta_image_frame.on("select", function () {
              var e = i.meta_image_frame
                .state()
                .get("selection")
                .first()
                .toJSON();
              i.insertMedia(e, t);
            }),
              this.meta_image_frame.open();
          }
        },
        clickLinkButton: function (e, t) {
          var i = t.invoke("editor.createRange");
          t.invoke("editor.saveRange");
          var n = i.toString();
          (this.currentContext = t),
            jQuery(e.target)
              .closest(".note-customGroup > .note-btn-group")
              .on("hide.bs.dropdown", function (e) {
                return !1;
              }),
            jQuery(e.target)
              .closest(".note-customGroup > .note-btn-group")
              .on("shown.bs.dropdown", function (e) {
                jQuery(e.target).parent().parent().find(".link-text").val(n),
                  jQuery(e.target).parent().parent().find(".link-url").focus();
              });
        },
        clickExtra: function (e) {
          var t = jQuery(e.target).parent().find(".link-text"),
            i = jQuery(e.target).parent().find(".link-url"),
            n = jQuery(e.target).parent().find(".link-new-window");
          if (
            (this.currentContext.invoke("editor.restoreRange"),
            jQuery(e.target).hasClass("insert-link"))
          ) {
            var r = t.val(),
              o = i.val(),
              a = !!n.prop("checked");
            0 != r.length &&
              0 != o.length &&
              this.currentContext.invoke("editor.createLink", {
                text: r,
                url: o,
                isNewWindow: a,
              });
          }
          t.val(""),
            i.val(""),
            n.prop("checked", !1),
            jQuery(e.target)
              .closest("div.note-btn-group.open")
              .removeClass("open");
        },
        insertMedia: function (e, t) {
          t.invoke("editor.restoreRange"),
            "image" == e.type
              ? t.invoke("editor.insertImage", e.url)
              : t.invoke("editor.createLink", { text: e.filename, url: e.url });
        },
      });
    }),
    i("controllers/fieldStarRating", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("starrating"),
            "init:model",
            this.register
          ),
            this.listenTo(
              nfRadio.channel("starrating"),
              "render:view",
              this.initRating
            );
        },
        register: function (e) {
          e.set("renderRatings", this.renderRatings);
        },
        initRating: function (e) {
          jQuery(e.el).find(".starrating").rating();
        },
        renderRatings: function () {
          for (
            var e = document.createElement("span"), t = 0;
            t <= this.number_of_stars - 1;
            t++
          ) {
            var i = nfRadio
                .channel("app")
                .request("get:template", "#tmpl-nf-field-starrating-star"),
              n = t + 1,
              r = "";
            this.value == n && (r = "checked");
            var o = i({
              id: this.id,
              classes: this.classes,
              num: n,
              checked: r,
              required: this.required,
            });
            e.appendChild(document.createRange().createContextualFragment(o));
          }
          return e.innerHTML;
        },
      });
    }),
    i("controllers/fieldTerms", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(nfRadio.channel("terms"), "init:model", this.register);
        },
        register: function (e) {
          this.listenTo(
            nfRadio.channel("field-" + e.get("id")),
            "click:extra",
            this.clickExtra
          ),
            this.listenTo(
              nfRadio.channel("field-" + e.get("id")),
              "keyup:field",
              this.keyUpExtra
            );
        },
        clickExtra: function (e, t) {
          var i = jQuery(e.currentTarget).parent().find(".extra-value").val();
          this.addOption(t, i);
        },
        keyUpExtra: function (e, t, i) {
          13 == i && this.addOption(t, e.val());
        },
        addOption: function (e, t) {
          if (t) {
            var i = { label: t, value: t, selected: 0 };
            e.get("options").push(i),
              e.get("value").push(t),
              e.trigger("reRender");
          }
        },
      });
    }),
    i("controllers/formContentFilters", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          (this.viewFilters = []),
            (this.loadFilters = []),
            nfRadio
              .channel("formContent")
              .reply("add:viewFilter", this.addViewFilter, this),
            nfRadio
              .channel("formContent")
              .reply("add:loadFilter", this.addLoadFilter, this),
            nfRadio
              .channel("formContent")
              .reply("get:viewFilters", this.getViewFilters, this),
            nfRadio
              .channel("formContent")
              .reply("get:loadFilters", this.getLoadFilters, this),
            nfRadio
              .channel("fieldContents")
              .reply("add:viewFilter", this.addViewFilter, this),
            nfRadio
              .channel("fieldContents")
              .reply("add:loadFilter", this.addLoadFilter, this),
            nfRadio
              .channel("fieldContents")
              .reply("get:viewFilters", this.getViewFilters, this),
            nfRadio
              .channel("fieldContents")
              .reply("get:loadFilters", this.getLoadFilters, this);
        },
        addViewFilter: function (e, t) {
          this.viewFilters[t] = e;
        },
        getViewFilters: function () {
          return this.viewFilters;
        },
        addLoadFilter: function (e, t) {
          this.loadFilters[t] = e;
        },
        getLoadFilters: function () {
          return this.loadFilters;
        },
      });
    }),
    i("views/fieldItem", [], function () {
      return Marionette.ItemView.extend({
        tagName: "div",
        initialize: function () {
          this.listenTo(this.model, "reRender", this.render, this),
            this.listenTo(
              this.model,
              "change:addWrapperClass",
              this.addWrapperClass,
              this
            ),
            this.listenTo(
              this.model,
              "change:removeWrapperClass",
              this.removeWrapperClass,
              this
            ),
            this.listenTo(
              this.model,
              "change:invalid",
              this.toggleAriaInvalid,
              this
            ),
            (this.template =
              "#tmpl-nf-field-" + this.model.get("wrap_template"));
        },
        test: function (e) {
          console.log("firing from trigger 1");
        },
        addWrapperClass: function () {
          var e = this.model.get("addWrapperClass");
          "" != e &&
            (jQuery(this.el).addClass(e),
            this.model.set("addWrapperClass", ""));
        },
        removeWrapperClass: function () {
          var e = this.model.get("removeWrapperClass");
          "" != e &&
            (jQuery(this.el).removeClass(e),
            this.model.set("removeWrapperClass", ""));
        },
        toggleAriaInvalid: function () {
          var e = this.model.get("invalid");
          jQuery("[aria-invalid]", this.el).attr(
            "aria-invalid",
            JSON.stringify(e)
          );
        },
        onRender: function () {
          if (
            ((this.$el = this.$el.children()),
            this.$el.unwrap(),
            this.setElement(this.$el),
            void 0 !== this.model.get("mask") &&
              "" != jQuery.trim(this.model.get("mask")))
          ) {
            if ("custom" == this.model.get("mask"))
              var e = this.model.get("custom_mask");
            else e = this.model.get("mask");
            if (
              ((Number.isInteger =
                Number.isInteger ||
                function (e) {
                  return (
                    "number" == typeof e && isFinite(e) && Math.floor(e) === e
                  );
                }),
              Number.isInteger(e) && (e = e.toString()),
              "currency" == e)
            ) {
              var t = nfRadio
                  .channel("app")
                  .request("get:form", this.model.get("formID")),
                i = t.get("thousands_sep");
              ("&nbsp;" != i && 160 != i.charCodeAt(0)) || (i = " ");
              var n = jQuery("<div/>").html(t.get("currencySymbol")).text(),
                r = {
                  digitGroupSeparator: (i = jQuery("<div/>").html(i).text()),
                  decimalCharacter: jQuery("<div/>")
                    .html(t.get("decimal_point"))
                    .text(),
                  currencySymbol: n,
                },
                o = jQuery(jQuery(this.el).find(".nf-element")[0]);
              new AutoNumeric(jQuery(this.el).find(".nf-element")[0], r);
              var a = this;
              o.on("change", function (e) {
                a.model.set("value", e.target.value);
              });
            } else jQuery(this.el).find(".nf-element").mask(e);
          }
          nfRadio.channel(this.model.get("type")).trigger("render:view", this),
            nfRadio.channel("fields").trigger("render:view", this);
        },
        templateHelpers: function () {
          var e = this;
          return {
            renderElement: function () {
              var e = _.find(this.element_templates, function (e) {
                if (0 < jQuery("#tmpl-nf-field-" + e).length) return !0;
              });
              return nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-field-" + e
                )(this);
            },
            renderLabel: function () {
              return nfRadio
                .channel("app")
                .request(
                  "get:template",
                  "#tmpl-nf-field-label"
                )(this);
            },
            renderLabelClasses: function () {
              var e = "";
              return (
                void 0 !== this.customLabelClasses &&
                  (e = this.customLabelClasses(e)),
                e
              );
            },
            renderPlaceholder: function () {
              var e = this.placeholder;
              return (
                void 0 !== this.customPlaceholder &&
                  (e = this.customPlaceholder(e)),
                "" != jQuery.trim(e) ? 'placeholder="' + _.escape(e) + '"' : ""
              );
            },
            renderWrapClass: function () {
              var e = "field-wrap " + this.type + "-wrap";
              return (
                this.type !== this.parentType &&
                  (e = e + " " + this.parentType + "-wrap"),
                void 0 !== this.old_classname &&
                  0 < jQuery.trim(this.old_classname).length &&
                  (e += " " + this.old_classname + "-wrap"),
                "undefined" != typeof customWrapClass &&
                  (e = customWrapClass(e)),
                e
              );
            },
            renderClasses: function () {
              var e = this.classes;
              return (
                this.error
                  ? (e += " nf-error")
                  : (e = e.replace("nf-error", "")),
                void 0 !== this.element_class &&
                  0 < jQuery.trim(this.element_class).length &&
                  (e += " " + this.element_class),
                void 0 !== this.customClasses && (e = this.customClasses(e)),
                e
              );
            },
            maybeFilterHTML: function () {
              return void 0 !== nfFrontEnd.filter_esc_status
                ? nfFrontEnd.filter_esc_status
                : "false";
            },
            maybeDisabled: function () {
              return 1 == this.disable_input ? "disabled" : "";
            },
            maybeRequired: function () {
              return 1 == this.required ? "required" : "";
            },
            maybeDisableAutocomplete: function () {
              return 1 == this.disable_browser_autocomplete
                ? 'autocomplete="off"'
                : "";
            },
            maybeInputLimit: function () {
              return "characters" == this.input_limit_type &&
                "" != jQuery.trim(this.input_limit)
                ? 'maxlength="' + this.input_limit + '"'
                : "";
            },
            getHelpText: function () {
              return void 0 !== this.help_text ? this.help_text : "";
            },
            maybeRenderHelp: function () {
              var e = document.createElement("p");
              e.innerHTML = this.help_text;
              var t = !1;
              if (
                ((0 != jQuery.trim(jQuery(e).text()).length ||
                  0 < jQuery(e).find("img").length) &&
                  (t = !0),
                void 0 !== this.help_text && t)
              ) {
                var i = document.createElement("span");
                return (
                  i.classList.add("fa", "fa-info-circle", "nf-help"),
                  i.setAttribute("data-text", this.getHelpText()),
                  i.outerHTML
                );
              }
              return "";
            },
            renderDescText: function () {
              if (void 0 === this.desc_text) return "";
              var e,
                t,
                i,
                n,
                r = document.createElement("p");
              return (
                (r.innerHTML = this.desc_text),
                0 == jQuery.trim(r.innerText).length
                  ? ""
                  : ((t = document.createTextNode(this.desc_text)),
                    (e = document.createElement("p")).appendChild(t),
                    0 != jQuery.trim(jQuery(e).text()).length
                      ? ((i = document
                          .createRange()
                          .createContextualFragment(this.desc_text)),
                        (n = document.createElement("div")).classList.add(
                          "nf-field-description"
                        ),
                        n.appendChild(i),
                        n.outerHTML)
                      : "")
              );
            },
            renderNumberDefault: function () {
              return this.clean
                ? this.default
                  ? this.default
                  : this.placeholder
                  ? ""
                  : this.value
                : this.value;
            },
            renderCurrencyFormatting: function (t) {
              var i = t
                .toString()
                .replace(".", "||")
                .replace(/\B(?=(\d{3})+(?!\d))/g, nfi18n.thousands_sep)
                .replace("||", nfi18n.decimal_point);
              return (
                nfRadio
                  .channel("app")
                  .request("get:form", e.model.get("formID"))
                  .get("settings").currency_symbol + i
              );
            },
            maybeRenderTime: function () {
              return (
                "time_only" == this.date_mode ||
                "date_and_time" == this.date_mode
              );
            },
          };
        },
        events: {
          "change .nf-element": "fieldChange",
          "keyup .nf-element": "fieldKeyup",
          "click .nf-element": "fieldClick",
          "click .extra": "extraClick",
          "change .extra": "extraChange",
          "blur .nf-element": "fieldBlur",
        },
        fieldChange: function (e) {
          var t = jQuery(e.currentTarget);
          nfRadio.channel("nfAdmin").request("change:field", t, this.model);
        },
        fieldKeyup: function (e) {
          var t = jQuery(e.currentTarget),
            i = e.keyCode;
          nfRadio
            .channel("field-" + this.model.get("id"))
            .trigger("keyup:field", t, this.model, i),
            nfRadio
              .channel(this.model.get("type"))
              .trigger("keyup:field", t, this.model, i),
            nfRadio.channel("fields").trigger("keyup:field", t, this.model, i);
        },
        fieldClick: function (e) {
          var t = jQuery(e.currentTarget);
          nfRadio
            .channel("field-" + this.model.get("id"))
            .trigger("click:field", t, this.model),
            nfRadio
              .channel(this.model.get("type"))
              .trigger("click:field", t, this.model),
            nfRadio.channel("fields").trigger("click:field", t, this.model);
        },
        extraClick: function (e) {
          nfRadio
            .channel("field-" + this.model.get("id"))
            .trigger("click:extra", e, this.model),
            nfRadio
              .channel(this.model.get("type"))
              .trigger("click:extra", e, this.model),
            nfRadio.channel("fields").trigger("click:extra", e, this.model);
        },
        extraChange: function (e) {
          nfRadio
            .channel("field-" + this.model.get("id"))
            .trigger("change:extra", e, this.model),
            nfRadio
              .channel(this.model.get("type"))
              .trigger("change:extra", e, this.model),
            nfRadio.channel("fields").trigger("change:extra", e, this.model);
        },
        fieldBlur: function (e) {
          var t = jQuery(e.currentTarget);
          nfRadio
            .channel("field-" + this.model.get("id"))
            .trigger("blur:field", t, this.model),
            nfRadio
              .channel(this.model.get("type"))
              .trigger("blur:field", t, this.model),
            nfRadio.channel("fields").trigger("blur:field", t, this.model);
        },
        onAttach: function () {
          nfRadio.channel(this.model.get("type")).trigger("attach:view", this);
        },
      });
    }),
    i("views/beforeField", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-field-before",
      });
    }),
    i("views/fieldErrorItem", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-field-error",
        onRender: function () {
          (this.$el = this.$el.children()),
            this.$el.unwrap(),
            this.setElement(this.$el);
        },
      });
    }),
    i("views/fieldErrorCollection", ["views/fieldErrorItem"], function (e) {
      return Marionette.CollectionView.extend({
        tagName: "nf-errors",
        childView: e,
        initialize: function (e) {
          this.fieldModel = e.fieldModel;
        },
        onRender: function () {
          0 == this.fieldModel.get("errors").models.length
            ? (this.fieldModel.removeWrapperClass("nf-error"),
              this.fieldModel.removeWrapperClass("nf-fail"),
              this.fieldModel.addWrapperClass("nf-pass"),
              this.fieldModel.setInvalid(!1))
            : (this.fieldModel.removeWrapperClass("nf-pass"),
              this.fieldModel.addWrapperClass("nf-fail"),
              this.fieldModel.addWrapperClass("nf-error"),
              this.fieldModel.setInvalid(!0));
        },
      });
    }),
    i("views/inputLimit", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-field-input-limit",
        initialize: function () {
          this.listenTo(
            nfRadio.channel("field-" + this.model.get("id")),
            "keyup:field",
            this.updateCount
          ),
            (this.count = this.model.get("input_limit")),
            this.render();
        },
        updateCount: function (e, t) {
          var i = jQuery(e).val(),
            n = i.trim().replace(/\s+/gi, " ").split(" "),
            r = n.length,
            o = i.length;
          if (
            "characters" == this.model.get("input_limit_type") ||
            "char" == this.model.get("input_limit_type")
          )
            jQuery(e).attr("maxlength", this.model.get("input_limit")),
              (this.count = this.model.get("input_limit") - o);
          else {
            this.count = this.model.get("input_limit") - r;
            var a = this.model.get("input_limit");
            r > a && jQuery(e).val(n.slice(0, a).join(" "));
          }
          this.render();
        },
        templateHelpers: function () {
          var e = this;
          return {
            currentCount: function () {
              return e.count;
            },
          };
        },
      });
    }),
    i(
      "views/afterField",
      ["views/fieldErrorCollection", "views/inputLimit"],
      function (e, t) {
        return Marionette.ItemView.extend({
          tagName: "nf-section",
          template: "#tmpl-nf-field-after",
          initialize: function () {
            this.model.on("change:errors", this.changeError, this);
          },
          onRender: function () {
            var i = jQuery(this.el).children(".nf-error-wrap");
            if (
              ((this.errorCollectionView = new e({
                el: i,
                collection: this.model.get("errors"),
                fieldModel: this.model,
              })),
              0 < this.model.get("errors").length &&
                this.errorCollectionView.render(),
              void 0 !== this.model.get("input_limit") &&
                "" != jQuery.trim(this.model.get("input_limit")))
            ) {
              var n = jQuery(this.el).children(".nf-input-limit");
              this.inputLimitView = new t({ el: n, model: this.model });
            }
          },
          changeError: function () {
            this.errorCollectionView.render();
          },
        });
      }
    ),
    i(
      "views/fieldRepeaterFieldLayout",
      ["views/fieldItem", "views/beforeField", "views/afterField"],
      function (e, t, i) {
        return Marionette.LayoutView.extend({
          tagName: "nf-field",
          regions: {
            beforeField: ".nf-before-field",
            field: ".nf-field",
            afterField: ".nf-after-field",
          },
          initialize: function () {
            this.listenTo(this.model, "change:visible", this.render, this);
          },
          getTemplate: function () {
            return this.model.get("visible")
              ? "#tmpl-nf-field-layout"
              : "#tmpl-nf-empty";
          },
          onRender: function () {
            this.model.get("visible") &&
              (this.beforeField.show(new t({ model: this.model })),
              this.field.show(new e({ model: this.model })),
              this.afterField.show(new i({ model: this.model })));
          },
          templateHelpers: function () {
            return {
              renderContainerClass: function () {
                var e = " label-" + this.label_pos + " ";
                return (
                  void 0 !== this.desc_pos &&
                    (e += "desc-" + this.desc_pos + " "),
                  void 0 !== this.container_class &&
                    0 < jQuery.trim(this.container_class).length &&
                    (e += this.container_class + " "),
                  this.type !== this.parentType &&
                    (e += " " + this.parentType + "-container"),
                  e
                );
              },
            };
          },
        });
      }
    ),
    i(
      "views/fieldRepeaterFieldCollection",
      ["views/fieldRepeaterFieldLayout"],
      function (e) {
        return Marionette.CollectionView.extend({
          tagName: "nf-fields-wrap",
          childView: e,
        });
      }
    ),
    i(
      "views/fieldRepeaterSetLayout",
      ["views/fieldRepeaterFieldCollection"],
      function (e) {
        return Marionette.LayoutView.extend({
          tagName: "fieldset",
          template: "#tmpl-nf-field-repeater-set",
          regions: { fields: ".nf-repeater-fieldset" },
          onRender: function () {
            this.fields.show(new e({ collection: this.model.get("fields") }));
          },
          templateHelpers: function () {
            return {
              maybeFilterHTML: function () {
                return void 0 !== nfFrontEnd.filter_esc_status
                  ? nfFrontEnd.filter_esc_status
                  : "false";
              },
            };
          },
          events: { "click .nf-remove-fieldset": "removeSet" },
          removeSet: function () {
            nfRadio
              .channel("field-repeater")
              .trigger("remove:fieldset", this.model);
          },
        });
      }
    ),
    i(
      "views/fieldRepeaterSetCollection",
      ["views/fieldRepeaterSetLayout"],
      function (e) {
        return Marionette.CollectionView.extend({
          tagName: "div",
          childView: e,
        });
      }
    ),
    i(
      "views/fieldRepeaterLayout",
      ["views/fieldRepeaterSetCollection"],
      function (e) {
        return Marionette.LayoutView.extend({
          tagName: "div",
          template: "#tmpl-nf-field-repeater",
          regions: { sets: ".nf-repeater-fieldsets" },
          initialize: function () {
            (this.collection = this.model.get("sets")),
              nfRadio
                .channel("field-repeater")
                .on("rerender:fieldsets", this.render, this),
              this.listenTo(
                nfRadio.channel("form-" + this.model.get("formID")),
                "before:submit",
                this.beforeSubmit
              );
          },
          onRender: function () {
            this.sets.show(new e({ collection: this.collection }));
          },
          templateHelpers: function () {
            return {
              maybeFilterHTML: function () {
                return void 0 !== nfFrontEnd.filter_esc_status
                  ? nfFrontEnd.filter_esc_status
                  : "false";
              },
            };
          },
          events: { "click .nf-add-fieldset": "addSet" },
          addSet: function (e) {
            nfRadio.channel("field-repeater").trigger("add:fieldset", e);
          },
          beforeSubmit: function () {
            this.collection.beforeSubmit(this.model.get("sets"));
          },
        });
      }
    ),
    i(
      "views/fieldLayout",
      [
        "views/fieldItem",
        "views/beforeField",
        "views/afterField",
        "views/fieldRepeaterLayout",
      ],
      function (e, t, i, n) {
        return Marionette.LayoutView.extend({
          tagName: "nf-field",
          regions: {
            beforeField: ".nf-before-field",
            field: ".nf-field",
            afterField: ".nf-after-field",
          },
          initialize: function () {
            this.listenTo(this.model, "change:visible", this.render, this);
          },
          getTemplate: function () {
            return this.model.get("visible")
              ? "#tmpl-nf-field-layout"
              : "#tmpl-nf-empty";
          },
          onRender: function () {
            this.model.get("visible") &&
              (this.beforeField.show(new t({ model: this.model })),
              "repeater" == this.model.get("type")
                ? this.field.show(new n({ model: this.model }))
                : this.field.show(new e({ model: this.model })),
              this.afterField.show(new i({ model: this.model })));
          },
          templateHelpers: function () {
            return {
              renderContainerClass: function () {
                var e = " label-" + this.label_pos + " ";
                return (
                  void 0 !== this.desc_pos &&
                    (e += "desc-" + this.desc_pos + " "),
                  void 0 !== this.container_class &&
                    0 < jQuery.trim(this.container_class).length &&
                    (e += this.container_class + " "),
                  this.type !== this.parentType &&
                    (e += " " + this.parentType + "-container"),
                  e
                );
              },
            };
          },
        });
      }
    ),
    i(
      "controllers/loadViews",
      ["views/fieldItem", "views/fieldLayout"],
      function (e, t) {
        return Marionette.Object.extend({
          initialize: function () {
            nfRadio.channel("views").reply("get:fieldItem", this.getFieldItem),
              nfRadio
                .channel("views")
                .reply("get:fieldLayout", this.getFieldLayout);
          },
          getFieldItem: function (t) {
            return e;
          },
          getFieldLayout: function () {
            return t;
          },
        });
      }
    ),
    i("controllers/formErrors", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(nfRadio.channel("fields"), "add:error", this.addError),
            this.listenTo(
              nfRadio.channel("fields"),
              "remove:error",
              this.removeError
            ),
            nfRadio.channel("form").reply("get:errors", this.getFormErrors);
        },
        addError: function (e, t, i) {
          var n = nfRadio.channel("app").request("get:form", e.get("formID"));
          void 0 === n.get("fieldErrors")[e.get("id")] &&
            (n.get("fieldErrors")[e.get("id")] = {}),
            (n.get("fieldErrors")[e.get("id")][t] = i),
            nfRadio
              .channel("form-" + e.get("formID"))
              .request(
                "add:error",
                "field-errors",
                n.get("settings").formErrorsCorrectErrors
              );
        },
        removeError: function (e, t) {
          var i = nfRadio.channel("app").request("get:form", e.get("formID"));
          (i.get("fieldErrors")[e.get("id")] = _.omit(
            i.get("fieldErrors")[e.get("id")],
            t
          )),
            0 == _.size(i.get("fieldErrors")[e.get("id")]) &&
              delete i.get("fieldErrors")[e.get("id")],
            0 == _.size(i.get("fieldErrors")) &&
              nfRadio
                .channel("form-" + e.get("formID"))
                .request("remove:error", "field-errors");
        },
        getFormErrors: function (e) {
          var t = nfRadio.channel("app").request("get:form", e),
            i = !1;
          return (
            t &&
              0 !== t.get("errors").length &&
              _.each(t.get("errors").models, function (e) {
                (i = i || {})[e.get("id")] = e.get("msg");
              }),
            i
          );
        },
      });
    }),
    i("controllers/submit", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("forms"),
            "init:model",
            this.registerSubmitHandler
          );
        },
        registerSubmitHandler: function (e) {
          nfRadio.channel("form-" + e.get("id")).reply("submit", this.submit);
        },
        submit: function (e) {
          nfRadio.channel("forms").trigger("before:submit", e),
            nfRadio.channel("form-" + e.get("id")).trigger("before:submit", e);
          var t = nfRadio.channel("forms").request("maybe:validate", e);
          if (
            (!1 !== t &&
              (_.each(e.get("fields").models, function (e) {
                e.set("clean", !1);
              }),
              e.get("formContentData").validateFields()),
            0 ==
              nfRadio.channel("form-" + e.get("id")).request("maybe:submit", e))
          )
            return (
              nfRadio.channel("forms").trigger("submit:cancel", e),
              void nfRadio
                .channel("form-" + e.get("id"))
                .trigger("submit:cancel", e)
            );
          if (!1 !== t) {
            var i = _.filter(e.get("errors").models, function (e) {
              return (
                "invalid_email" != e.get("id") &&
                "email_not_sent" != e.get("id")
              );
            });
            if (0 != _.size(i))
              return (
                nfRadio.channel("forms").trigger("submit:failed", e),
                nfRadio
                  .channel("form-" + e.get("id"))
                  .trigger("submit:failed", e),
                !1
              );
          }
          nfRadio.channel("forms").trigger("after:submitValidation", e),
            nfRadio
              .channel("form-" + e.get("id"))
              .trigger("after:submitValidation", e);
          var n = e.get("id"),
            r = {},
            myCustomData = {};

          _.each(e.get("fields").models, function (e) {
            // SCP CUSTOM
            var t = {
              id: e.get("id"),
              name: e.get("key"),
              value: e.get("value"),
              label: e.get("label"),
            };
            r[e.get("id")] =
              nfRadio.channel(e.get("type")).request("get:submitData", t, e) ||
              t;
            // SCP CUSTOM
            myCustomData[e.get("key")] =
              nfRadio.channel(e.get("type")).request("get:submitData", t, e) ||
              t;
          });
          var o = e.get("extra"),
            a = e.get("settings");
          delete a.formContentData;

          // SCP CUSTOM
          // const queryString = window.location.search;
          // const urlParams = new URLSearchParams(queryString);
          // const clinical_case_id = urlParams.get("id");

          // SCP CUSTOM
          var l = JSON.stringify({
            form_id: n,
            cc_emails: myCustomData.cc_emails && myCustomData.cc_emails.value,
            clinical_case_type:
              myCustomData.clinical_case_type && myCustomData.clinical_case_type.value,
            form_json: JSON.stringify(myCustomData),
            meta_ninja_data: JSON.stringify({
              id: n,
              fields: r,
              settings: a,
              extra: 0,
            }),
          });

          jQuery.ajax({
            // url: nfFrontEnd.adminAjax,
            url: "https://api.scp.com.co/ninja-forms-webhook",
            type: "POST",
            contentType: "application/json",
            data: l,
            cache: !1,

            success: function (t, i, n) {
              try {
                var r = t;
                nfRadio
                  .channel("forms")
                  .trigger("submit:response", r, i, n, e.get("id")),
                  nfRadio
                    .channel("form-" + e.get("id"))
                    .trigger("submit:response", r, i, n),
                  jQuery(document).trigger("nfFormSubmitResponse", {
                    response: r,
                    id: e.get("id"),
                  });
              } catch (e) {
                console.log(e), console.log("Parse Error"), console.log(e);
              }
            },
            error: function (t, i, n) {
              console.log("ERRORS: " + n), console.log(t);
              try {
                var r = jQuery.parseJSON(t.responseText);
                nfRadio
                  .channel("forms")
                  .trigger("submit:response", r, i, t, e.get("id")),
                  nfRadio
                    .channel("form-" + e.get("id"))
                    .trigger("submit:response", r, i, t);
              } catch (e) {
                console.log("Parse Error");
              }
              nfRadio
                .channel("forms")
                .trigger("submit:response", "error", i, t, n);
            },
          });
        },
      });
    }),
    i("views/fieldCollection", ["views/fieldLayout"], function (e) {
      return Marionette.CollectionView.extend({
        tagName: "nf-fields-wrap",
        childView: e,
      });
    }),
    i(
      "controllers/defaultFilters",
      ["views/fieldCollection", "models/fieldCollection"],
      function (e, t) {
        return Marionette.Object.extend({
          initialize: function () {
            this.listenTo(
              nfRadio.channel("form"),
              "before:filterData",
              this.registerDefaultDataFilter
            );
          },
          registerDefaultDataFilter: function (e) {
            nfRadio
              .channel("formContent")
              .request("add:loadFilter", this.defaultFormContentLoad, 10, this),
              nfRadio
                .channel("formContent")
                .request(
                  "add:viewFilter",
                  this.defaultFormContentView,
                  10,
                  this
                );
          },
          defaultFormContentLoad: function (e, i, n) {
            var r = i.get("fields"),
              o = nfRadio.channel("formContent").request("get:loadFilters");
            if (
              1 == _.without(o, void 0).length ||
              void 0 === e ||
              !0 == e instanceof Backbone.Collection
            )
              return i.get("fields");
            var a = _.map(
                e,
                function (e) {
                  return i.get("fields").findWhere({ key: e });
                },
                this
              ),
              l = new t(a);
            return (
              r.on("reset", function (e) {
                var t = [];
                l.each(function (i) {
                  "submit" != i.get("type")
                    ? t.push(e.findWhere({ key: i.get("key") }))
                    : t.push(i);
                }),
                  (l.options = { formModel: i }),
                  l.reset(t);
              }),
              l
            );
          },
          defaultFormContentView: function () {
            return e;
          },
        });
      }
    ),
    i("controllers/uniqueFieldError", [], function () {
      return Marionette.Object.extend({
        initialize: function () {
          this.listenTo(
            nfRadio.channel("fields"),
            "change:modelValue",
            this.removeError
          ),
            this.listenTo(
              nfRadio.channel("fields"),
              "keyup:field",
              this.removeError
            ),
            this.listenTo(
              nfRadio.channel("fields"),
              "blur:field",
              this.removeError
            );
        },
        removeError: function (e, t) {
          (t = t || e),
            nfRadio
              .channel("fields")
              .request("remove:error", t.get("id"), "unique_field");
        },
      });
    }),
    i("models/fieldRepeaterSetModel", [], function () {
      return Backbone.Model.extend({
        initialize: function (e, t) {
          (this.repeaterFieldModel = t.repeaterFieldModel),
            this.set("label", this.repeaterFieldModel.get("label")),
            nfRadio
              .channel("field-repeater")
              .reply(
                "reset:repeaterFieldsets",
                this.resetRepeaterFieldsets,
                this
              ),
            nfRadio
              .channel("field-repeater")
              .reply("get:repeaterFieldsets", this.getRepeaterFieldsets, this),
            nfRadio
              .channel("field-repeater")
              .reply("get:repeaterFields", this.getRepeaterFields, this),
            nfRadio
              .channel("field-repeater")
              .reply("get:repeaterFieldById", this.getRepeaterFieldById, this);
        },
        resetRepeaterFieldsets: function (e) {
          (this.collection = {}), (this.collection.models = e);
        },
        getRepeaterFieldsets: function () {
          return this.collection.models;
        },
        getRepeaterFields: function () {
          let e = this.getRepeaterFieldsets();
          if (e.length <= 0) return;
          let t = [];
          return (
            _.each(e, function (e) {
              const i = e.get("fields");
              _.each(i.models, function (e) {
                t.push(e);
              });
            }),
            t
          );
        },
        getRepeaterFieldById: function (e) {
          let t,
            i = this.getRepeaterFields();
          if (!(i.length <= 0))
            return (
              _.each(i, function (i) {
                i.id === e && (t = i);
              }),
              t
            );
        },
      });
    }),
    i(
      "models/fieldRepeaterSetCollection",
      ["models/fieldRepeaterSetModel", "models/fieldCollection"],
      function (e, t) {
        return Backbone.Collection.extend({
          model: e,
          initialize: function (e, t) {
            (this.options = t),
              nfRadio
                .channel("field-repeater")
                .on("sort:fieldsets", this.sortIDs, this),
              nfRadio
                .channel("field-repeater")
                .on("remove:fieldset", this.removeSet, this),
              nfRadio
                .channel("field-repeater")
                .on("add:fieldset", this.addSet, this);
          },
          addSet: function (e) {
            const i = jQuery(e.target).prev(".nf-repeater").data("field-id"),
              n =
                this.options.repeaterFieldModel.id === i
                  ? this.options.repeaterFieldModel
                  : void 0;
            if (void 0 !== n) {
              let e = new t(this.options.templateFields, {
                formModel: this.options.formModel,
                repeaterFieldModel: n,
              });
              this.add({ fields: e }, { repeaterFieldModel: n }),
                this.sortIDs();
            }
          },
          removeSet: function (e) {
            this.remove(e), this.sortIDs();
          },
          sortIDs: function () {
            nfRadio
              .channel("field-repeater")
              .request("reset:repeaterFieldsets", this.models),
              _.each(this.models, function (e, t) {
                let i = e.get("fields");
                e.set("index", t + 1),
                  _.each(i.models, function (e) {
                    (cutEl = String(e.id).split("_")[0]),
                      e.set("id", cutEl + "_" + t);
                  });
              }),
              nfRadio.channel("field-repeater").trigger("rerender:fieldsets");
          },
          beforeSubmit: function (e) {
            let t = e.models;
            if (t.length > 0) {
              let e = {};
              _.each(t, function (t) {
                let i = t.get("fields");
                _.each(i.models, function (t) {
                  let i = t.get("value"),
                    n = t.get("id");
                  e[n] = { value: i, id: n };
                });
              }),
                nfRadio
                  .channel("nfAdmin")
                  .request("update:field", this.options.repeaterFieldModel, e);
            }
          },
        });
      }
    ),
    i(
      "controllers/fieldRepeater",
      ["models/fieldRepeaterSetCollection", "models/fieldCollection"],
      function (e, t) {
        return Marionette.Object.extend({
          initialize: function () {
            this.listenTo(
              nfRadio.channel("repeater"),
              "init:model",
              this.initRepeater
            );
          },
          initRepeater: function (i) {
            if (void 0 === i.collection.options.formModel) return !1;
            let n = new t(i.get("fields"), {
              formModel: i.collection.options.formModel,
            });
            i.set(
              "sets",
              new e([{ fields: n }], {
                templateFields: i.get("fields"),
                formModel: i.collection.options.formModel,
                repeaterFieldModel: i,
              })
            );
          },
        });
      }
    ),
    i(
      "controllers/loadControllers",
      [
        "controllers/formData",
        "controllers/fieldError",
        "controllers/changeField",
        "controllers/changeEmail",
        "controllers/changeDate",
        "controllers/fieldCheckbox",
        "controllers/fieldCheckboxList",
        "controllers/fieldImageList",
        "controllers/fieldRadio",
        "controllers/fieldNumber",
        "controllers/mirrorField",
        "controllers/confirmField",
        "controllers/updateFieldModel",
        "controllers/submitButton",
        "controllers/submitDebug",
        "controllers/getFormErrors",
        "controllers/validateRequired",
        "controllers/submitError",
        "controllers/actionRedirect",
        "controllers/actionSuccess",
        "controllers/fieldSelect",
        "controllers/coreSubmitResponse",
        "controllers/fieldProduct",
        "controllers/fieldTotal",
        "controllers/fieldQuantity",
        "controllers/calculations",
        "controllers/dateBackwardsCompat",
        "controllers/fieldDate",
        "controllers/fieldRecaptcha",
        "controllers/fieldRecaptchaV3",
        "controllers/fieldHTML",
        "controllers/helpText",
        "controllers/fieldTextbox",
        "controllers/fieldTextareaRTE",
        "controllers/fieldStarRating",
        "controllers/fieldTerms",
        "controllers/formContentFilters",
        "controllers/loadViews",
        "controllers/formErrors",
        "controllers/submit",
        "controllers/defaultFilters",
        "controllers/uniqueFieldError",
        "controllers/fieldRepeater",
      ],
      function (
        e,
        t,
        i,
        n,
        r,
        o,
        a,
        l,
        s,
        d,
        c,
        f,
        u,
        h,
        m,
        g,
        p,
        v,
        y,
        b,
        R,
        _,
        w,
        x,
        C,
        F,
        k,
        M,
        T,
        j,
        E,
        q,
        D,
        Q,
        V,
        O,
        I,
        L,
        S,
        N,
        z,
        A,
        B
      ) {
        return Marionette.Object.extend({
          initialize: function () {
            new L(),
              new S(),
              new N(),
              new o(),
              new a(),
              new l(),
              new s(),
              new d(),
              new R(),
              new w(),
              new x(),
              new C(),
              new T(),
              new j(),
              new E(),
              new q(),
              new D(),
              new Q(),
              new V(),
              new O(),
              new I(),
              new A(),
              new B(),
              new t(),
              new i(),
              new n(),
              new r(),
              new c(),
              new f(),
              new u(),
              new h(),
              new m(),
              new g(),
              new p(),
              new v(),
              new y(),
              new b(),
              new _(),
              new F(),
              new z(),
              new k(),
              new M(),
              new e();
          },
        });
      }
    ),
    i("views/beforeForm", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-before-form",
      });
    }),
    i("views/formErrorItem", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-form-error",
        onRender: function () {},
      });
    }),
    i("views/formErrorCollection", ["views/formErrorItem"], function (e) {
      return Marionette.CollectionView.extend({
        tagName: "nf-errors",
        childView: e,
      });
    }),
    i("views/honeyPot", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-form-hp",
        events: {
          "keyup .nf-field-hp": "maybeError",
          "change .nf-field-hp": "maybeError",
        },
        maybeError: function (e) {
          if (0 == jQuery(e.target).val().length)
            nfRadio
              .channel("form-" + this.model.get("id"))
              .request("remove:error", "honeyPot");
          else {
            var t = nfRadio
              .channel("app")
              .request("get:form", this.model.get("id"));
            nfRadio
              .channel("form-" + this.model.get("id"))
              .request(
                "add:error",
                "honeyPot",
                t.get("settings").honeypotHoneypotError
              );
          }
        },
      });
    }),
    i(
      "views/afterFormContent",
      ["views/formErrorCollection", "views/honeyPot"],
      function (e, t) {
        return Marionette.LayoutView.extend({
          tagName: "nf-section",
          template: "#tmpl-nf-after-fields",
          regions: { errors: ".nf-form-errors", hp: ".nf-form-hp" },
          onShow: function () {
            this.errors.show(new e({ collection: this.model.get("errors") })),
              this.hp.show(new t({ model: this.model }));
          },
        });
      }
    ),
    i("views/beforeFormContent", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-before-fields",
        templateHelpers: function () {
          return {
            renderFieldsMarkedRequired: function () {
              return this.fields.filter({ required: 1 }).length
                ? this.fieldsMarkedRequired
                : "";
            },
          };
        },
      });
    }),
    i(
      "views/formLayout",
      [
        "views/afterFormContent",
        "views/beforeFormContent",
        "models/fieldCollection",
      ],
      function (e, t, i) {
        return Marionette.LayoutView.extend({
          tagName: "nf-section",
          template: "#tmpl-nf-form-layout",
          regions: {
            beforeFormContent: ".nf-before-form-content",
            formContent: ".nf-form-content",
            afterFormContent: ".nf-after-form-content",
          },
          initialize: function () {
            nfRadio
              .channel("form-" + this.model.get("id"))
              .reply("get:el", this.getEl, this),
              this.listenTo(this.model, "hide", this.hide);
          },
          onRender: function () {
            (this.$el = this.$el.children()),
              this.$el.unwrap(),
              this.setElement(this.$el);
          },
          onShow: function () {
            this.beforeFormContent.show(new t({ model: this.model }));
            var i = this.model.get("formContentData"),
              n = nfRadio.channel("formContent").request("get:viewFilters"),
              r = _.without(n, void 0),
              o = _.first(r);
            formContentView = o();
            var a = { data: i, formModel: this.model };
            !1 != i instanceof Backbone.Collection
              ? (a.collection = i)
              : !1 != i instanceof Backbone.Model && (a.model = i),
              this.formContent.show(new formContentView(a)),
              this.afterFormContent.show(new e({ model: this.model }));
          },
          getEl: function () {
            return this.el;
          },
          templateHelpers: function () {
            return {
              renderClasses: function () {
                return "";
              },
            };
          },
          hide: function () {
            jQuery(this.el).hide();
          },
        });
      }
    ),
    i("views/afterForm", [], function () {
      return Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#tmpl-nf-after-form",
      });
    }),
    i(
      "views/mainLayout",
      ["views/beforeForm", "views/formLayout", "views/afterForm"],
      function (e, t, i) {
        return Marionette.LayoutView.extend({
          template: "#tmpl-nf-layout",
          regions: {
            responseMsg: ".nf-response-msg",
            beforeForm: ".nf-before-form",
            formLayout: ".nf-form-layout",
            afterForm: ".nf-after-form",
          },
          initialize: function () {
            (this.$el = jQuery("#nf-form-" + this.model.id + "-cont")),
              (this.el = "#nf-form-" + this.model.id + "-cont"),
              this.render(),
              this.beforeForm.show(new e({ model: this.model })),
              this.formLayout.show(
                new t({
                  model: this.model,
                  fieldCollection: this.options.fieldCollection,
                })
              ),
              this.afterForm.show(new i({ model: this.model })),
              this.listenTo(this.model, "hide", this.hide);
          },
          hide: function () {
            jQuery(this.el).find(".nf-form-title").hide();
          },
        });
      }
    );
  var n = function (e, t, i) {
    void 0 !== e && 0 < e.length
      ? (this.locale = e.split("_").join("-"))
      : (this.locale = "en-US"),
      (this.thousands_sep = t || ","),
      (this.decimal_sep = i || "."),
      (this.uniqueElememts = function (e, t, i) {
        return i.indexOf(e) === t;
      }),
      (this.numberDecoder = function (e) {
        var t = "",
          i = !1;
        "-" === (e = e.toString()).charAt(0) &&
          ((i = !0), (e = e.replace("-", "")));
        var n = (e = (e = e.replace(/\s/g, "")).replace(/&nbsp;/g, ""))
            .split("")
            .filter(function (e) {
              return !e.match(/[0-9]/);
            }),
          r = n.filter(this.uniqueElememts);
        switch (r.length) {
          case 0:
            t = e;
            break;
          case 1:
            var o = "";
            if (1 == n.length)
              (separator = n.pop()),
                (o =
                  3 == e.split(separator).pop().length &&
                  separator == this.thousands_sep
                    ? ""
                    : ".");
            else separator = r.pop();
            t = e.split(separator).join(o);
            break;
          case 2:
            var a,
              l = r[0];
            (a = "." === l ? new RegExp("[.]", "g") : new RegExp(l, "g")),
              (t = e.replace(a, ""));
            var s,
              d = r[1];
            (s = "." === d ? new RegExp("[.]", "g") : new RegExp(d, "g")),
              (t = t.replace(s, "."));
            break;
          default:
            return "NaN";
        }
        return (
          i && (t = "-" + t), this.debug("Number Decoder " + e + " -> " + t), t
        );
      }),
      (this.numberEncoder = function (e, t) {
        return (
          (e = this.numberDecoder(e)),
          Intl.NumberFormat(this.locale, {
            minimumFractionDigits: t,
            maximumFractionDigits: t,
          }).format(e)
        );
      }),
      (this.debug = function (e) {
        window.nfLocaleConverterDebug && console.log(e);
      });
  };
  i("../nfLocaleConverter", function () {}),
    (function (e) {
      var t = e.fn.val;
      e.fn.val = function () {
        var i;
        arguments.length > 0 && (i = t.apply(this, []));
        var n = t.apply(this, arguments);
        return (
          arguments.length > 0 &&
            i != t.apply(this, []) &&
            e(this).hasClass("nf-element") &&
            e(this).change(),
          n
        );
      };
    })(jQuery),
    jQuery(document).ready(function (e) {
      t(
        [
          "models/formCollection",
          "models/formModel",
          "models/fieldCollection",
          "controllers/loadControllers",
          "views/mainLayout",
          "../nfLocaleConverter",
        ],
        function (t, i, r, o, a) {
          if ("undefined" != typeof nfForms) {
            var l = Marionette.Application.extend({
              forms: {},
              initialize: function (e) {
                var t = this;
                (Marionette.Renderer.render = function (e, i) {
                  return (e = t.template(e))(i);
                }),
                  (this.urlParameters = _.object(
                    _.compact(
                      _.map(location.search.slice(1).split("&"), function (e) {
                        if (e) return e.split("=");
                      })
                    )
                  )),
                  void 0 !== this.urlParameters.nf_resume &&
                    this.listenTo(
                      nfRadio.channel("form-" + this.urlParameters.nf_resume),
                      "loaded",
                      this.restart
                    ),
                  nfRadio
                    .channel("app")
                    .reply("locale:decodeNumber", this.decodeNumber),
                  nfRadio
                    .channel("app")
                    .reply("locale:encodeNumber", this.encodeNumber);
                new o();
                nfRadio.channel("app").trigger("after:loadControllers"),
                  nfRadio.channel("app").reply("get:template", this.template);
              },
              onStart: function () {
                var e = nfRadio.channel("app").request("get:forms");
                _.each(e.models, function (e, t) {
                  var i = new a({ model: e, fieldCollection: e.get("fields") });
                  nfRadio.channel("form").trigger("render:view", i),
                    jQuery(document).trigger("nfFormReady", i);
                });
              },
              restart: function (e) {
                if (void 0 !== this.urlParameters.nf_resume) {
                  var t = {
                    action: "nf_ajax_submit",
                    security: nfFrontEnd.ajaxNonce,
                    nf_resume: this.urlParameters,
                  };
                  nfRadio
                    .channel("form-" + e.get("id"))
                    .trigger("disable:submit"),
                    nfRadio
                      .channel("form-" + e.get("id"))
                      .trigger("processingLabel"),
                    this.listenTo(
                      nfRadio.channel("form"),
                      "render:view",
                      function () {
                        jQuery(
                          "#nf-form-" +
                            e.get("id") +
                            "-cont .nf-field-container:not(.submit-container)"
                        ).hide();
                      }
                    ),
                    jQuery.ajax({
                      // url: nfFrontEnd.adminAjax,
                      url: "https://497a-181-48-47-74.ngrok.io/raw/register-cc-form?id=1",
                      type: "POST",
                      data: t,
                      cache: !1,
                      success: function (t, i, n) {
                        try {
                          var r = t;
                          nfRadio
                            .channel("forms")
                            .trigger("submit:response", r, i, n, e.get("id")),
                            nfRadio
                              .channel("form-" + e.get("id"))
                              .trigger("submit:response", r, i, n);
                        } catch (e) {
                          console.log("Parse Error");
                        }
                      },
                      error: function (e, t, i) {
                        console.log("ERRORS: " + t),
                          nfRadio
                            .channel("forms")
                            .trigger("submit:response", "error", t, e, i);
                      },
                    });
                }
              },
              template: function (t) {
                return _.template(e(t).html(), {
                  evaluate: /<#([\s\S]+?)#>/g,
                  interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
                  escape: /\{\{([^\}]+?)\}\}(?!\})/g,
                  variable: "data",
                });
              },
              encodeNumber: function (e) {
                return new n(
                  nfi18n.siteLocale,
                  nfi18n.thousands_sep,
                  nfi18n.decimal_point
                ).numberEncoder(e);
              },
              decodeNumber: function (e) {
                return new n(
                  nfi18n.siteLocale,
                  nfi18n.thousands_sep,
                  nfi18n.decimal_point
                ).numberDecoder(e);
              },
            });
            new l().start();
          } else jQuery(".nf-form-cont").empty();
        }
      );
    }),
    i("main", function () {});
})();
//# sourceMappingURL=front-end.js.map

