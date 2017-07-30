import * as skate from "skatejs/src/index";

// tslint:disable no-any

type PropType = "string" | "number" | "object" | "array" | "boolean";
const identityFn: any = (x: any) => x;

export function prop(property: any): PropertyDecorator {

    return function (target: { [key: string]: any } & skate.Component<any>, propertyKey: string | symbol): void {

        // obtain properties provide by the @prop decorator
        const {type, ...skPropConfig} = property;

        // parse to find out the type of property
        const configType: PropType = parseType(type);

        // reference the skatejs prop function, e.g. prop.string
        const skatePropTypeFn: skate.ComponentProps<any, any> = skate.prop[configType] || identityFn;

        // get constructor of element
        const ctor: any = target.constructor as typeof skate.Component;

        // grab any existing props previously defined
        const existingProps: skate.ComponentProps<any, any> = (ctor.props || {}) as skate.ComponentProps<any, any>;

        // concatenate all props together
        const newProps: Array<skate.ComponentProps<any, any>> = {
            ...existingProps,
            ...{[propertyKey]: skatePropTypeFn(skPropConfig)}
        };

        // apply to the current instance of the component
        Object.defineProperty(
            ctor,
            "props",
            {
                configurable: true,
                get(): any {
                    return newProps;
                }
            }
        );
    };
}

function parseType(type: Function): PropType {

    if (typeof type !== "function") {

        return;
    }

    const inst: any = type();

    if (inst instanceof Array) {

        return "array";
    }

    if (typeof inst === "object") {

        return "object";
    }

    return (typeof inst) as "boolean" | "number" | "string";
}

// tslint:enable no-any
