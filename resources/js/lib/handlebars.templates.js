(function() {
  var template = Handlebars.template, templates = myApp.templates = myApp.templates || {};
templates['helloWorld'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- example of a handlebars expression -->\n<div>\n    <h3>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h3>\n\n    <!-- example of loading a partial with custom context -->\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"myPartial"),depth0,{"name":"myPartial","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['myPartial'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"subtitle") || (depth0 != null ? lookupProperty(depth0,"subtitle") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"subtitle","hash":{},"data":data,"loc":{"start":{"line":1,"column":3},"end":{"line":1,"column":15}}}) : helper)))
    + "</p>\n";
},"useData":true});
})();