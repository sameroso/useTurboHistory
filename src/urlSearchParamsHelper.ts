/**
 * @description           [Helper to Deal with the UrlSearchParams]
 *
 * @example
 *  const urlSearchParamsWithRemovedParam = urlSearchParamsHelper
 * .create('?key1=value1&key2=value2&key3=value3&key4=value4')
 * .removeParam("key2")
 * .urlSearchParamsString
 *
 *  console.log(urlSearchParamsWithRemovedParam) => "key1=value1&key3=value3&key4=value4"
 *
 *  --- Typescript ---
 *
 * const urlSearchParamsWithRemovedParam = urlSearchParamsHelper
 * .create<{ key1:string key2?string, key3:string, key4:string }>('?key1=value1&key2=value2&key3=value3&key4=value4')
 * .removeParam("key2")
 * .urlSearchParamsString
 *
 *  console.log(urlSearchParamsWithRemovedParam) => "key1=value1&key3=value3&key4=value4"
 *
 */

export class UrlSearchParamsHelper<T extends string> {
  urlSearchParams: URLSearchParams;

  constructor(queryUrl = "") {
    this.urlSearchParams = new URLSearchParams(queryUrl);
  }

  static create<K extends string>(queryUrl = ""): UrlSearchParamsHelper<K> {
    return new UrlSearchParamsHelper<K>(queryUrl);
  }

  /**
   * @description                               [remove params list specified by an array of strings representing the key]
   *
   * @param   { key : string[] }    paramsList        [array of strings representing the keys wanted to remove]
   *
   * @return  {string}                        [Url search params string modified]
   *
   * @example
   *  const urlSearchParamsWithRemovedParamList = UrlSearchParamsHelper
   *  .create('?key1=value1&key2=value2&key3=value3&key4=value4')
   *  .removeParamList(["key2", "key3"])
   *  .urlSearchParamsString
   *
   *  console.log(urlSearchParamsWithRemovedParamList) => "key1=value1&key4=value4"
   *
   *  --- Typescript ---
   *
   *  const urlSearchParamsWithRemovedParamList = UrlSearchParamsHelper
   *  .create<{ key1:string key2?string, key3?:string, key4?:string }>('?key1=value1&key2=value2&key3=value3&key4=value4')
   *  .removeParamList(["key2", "key3"])
   *  .urlSearchParamsString
   *
   *  console.log(urlSearchParamsWithRemovedParamList) => "key1=value1&key4=value4"
   *
   *
   */

  removeParamList(paramsList: (T | undefined)[]): UrlSearchParamsHelper<T> {
    paramsList.forEach((key) => {
      this.urlSearchParams.delete(key as string);
    });
    return this;
  }

  /**
   * @description                                                [if param exists it replaces the param, if it does not exists it adds param]
   *
   * @param   {{ key:string; value:string }[]}       paramsList  [paramsList description]
   *
   * @return  {string}                                           [Url search params string modified]
   *
   * @example
   *  const urlSearchParamWithAddedAndReplacedParam = UrlSearchParamsHelper
   *  .create('?key1=value1&key2=value2')
   *  .addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
   *  .urlSearchParamsString
   *
   *
   *  console.log(urlSearchParamWithAddedAndReplacedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
   *
   * --- Typescript ---
   *
   *  const urlSearchParamWithAddedAndReplacedParam = UrlSearchParamsHelper
   *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2')
   *  .addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
   *  .urlSearchParamsString
   *
   *
   *  console.log(urlSearchParamWithAddedAndReplacedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
   *
   */

  addOrReplaceParamList(
    paramsList?: { key: string | undefined; value: string }[]
  ): UrlSearchParamsHelper<T> {
    if (!paramsList || paramsList.length === 0) {
      return this;
    }

    paramsList.forEach(({ key, value }) => {
      this.urlSearchParams.set(key as string, value);
    });
    return this;
  }

  /**
   * @description                                                   [get all params on url search params]
   *
   *
   * @return  {Record<string, string>}                              [object containing all param values]
   *
   *  @example
   *  const params = UrlSearchParamsHelper
   *  .create('?key1=value1&key2=value2&key3=value3')
   *  .allParams
   *
   *  console.log(params) => { key1:"value1", key2:"value2", key3:"value3" };
   *
   *  --- Typescript ---
   *
   * const params = UrlSearchParamsHelper
   *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2&key3=value3')
   *  .allParams
   *
   *  console.log(params) => { key1:"value1", key2:"value2", key3:"value3" };
   *
   */

  get allParams(): Record<keyof T, string> | Record<string, never> {
    const entries = this.urlSearchParams.entries();
    let entriesValues = entries.next();
    const params: Record<string, string> = !entriesValues.done
      ? {
          [entriesValues?.value?.[0]]: entriesValues.value?.[1],
        }
      : {};
    while (!entriesValues.done && entriesValues.value) {
      params[entriesValues?.value?.[0]] = entriesValues?.value?.[1];
      entriesValues = entries.next();
    }
    return params as Record<keyof T, string>;
  }
  /**
   * @description        [get Url search params]
   *
   * @return  {string}  [url search params]
   *
   * @example
   *  const queryParamUrl = UrlSearchParamsHelper
   *  .create('?key1=value1&key2=value2&key3=value3')
   *  .urlSearchParamsString
   *
   *
   *  console.log(queryParamUrl) => "key1=value1&key2=value2&key3=value3";
   *
   *  --- Typescript ---
   *
   *  const queryParamUrl = UrlSearchParamsHelper
   *  .create<{ key1:string, key2:string, key3:string }>('?key1=value1&key2=value2&key3=value3')
   *  .urlSearchParamsString
   *
   *
   *  console.log(queryParamUrl) => "key1=value1&key2=value2&key3=value3";
   *
   */

  get urlSearchParamsString(): string {
    return this.urlSearchParams.toString();
  }
}
