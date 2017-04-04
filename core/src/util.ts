import 'rxjs/add/operator/publishReplay';
import { multicast } from 'rxjs/operator/multicast';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}

let labelCache: { [label: string]: boolean } = {};
export function label<T>(label: T | ''): T {
    if (labelCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unqiue"`);
    }

    labelCache[<string>label] = true;

    return <T>label;
}

export interface SelectorFn<T, V> {
    (input$: Observable<T>): Observable<V>;
}

export interface Selector<T, V> extends SelectorFn<T, V> {
    readonly cachedResult?: undefined | Observable<V>;
    reset(): void;
    override(source$: Observable<V>): void;
}

export function share<T, V>(selectFn: SelectorFn<T, V>): Selector<T, V> {
    let cachedResult: undefined | Observable<V>;

    const override: any = function (source$: Observable<V>): void {
        cachedResult = source$;
    };

    const reset: any = function (): void {
        cachedResult = undefined;
    };

    const multicastFactory: any = function (): ReplaySubject<V> {
        return new ReplaySubject<V>(1);
    };

    const selector: any = function (input$: Observable<T>): Observable<V> {
        if (Boolean(cachedResult)) {
            return cachedResult;
        }
        return cachedResult = multicast.call(selectFn(input$), multicastFactory).refCount();
    };

    selector.override = override;
    selector.reset = reset;
    Object.defineProperty(selector, 'cachedResult', {
        configurable: true,
        enumerable: true,
        get(): undefined | Observable<V> {
            return cachedResult;
        }
    });

    return selector;
}
