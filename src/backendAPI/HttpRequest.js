const scheme = 'https';
const host = 'mobike.ddns.net';
const port = null;

const retryInterval = 100;
const maxRetry = 10;

const ResquestLog = true;

const log = (message: string) => {
  if (ResquestLog) {
    console.log(message);
  }
};

export const GenerateRequestUrl = (path: String) => {
  if (port) {
    return scheme + '://' + host + ':' + port + '/' + path;
  }
  return scheme + '://' + host + '/' + path;
};

const ProcessResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    // log("ProcessResponse:"+ JSON.stringify(response) +  "\t" + contentType + " in Json format")
    const json = await response.json();
    return json;
  } else {
    log("ProcessResponse: " + contentType + " in Text format")
    const text = await response.text();
    return text;
  }
};

const PostRequest = async (path: String, body: Object, retry: number = 0) => {
  try {
    const url = GenerateRequestUrl(path);
    log('Post request url: ' + url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await ProcessResponse(response);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      retry += 1;
      log(
        'PostRequest: Network request failed ( ' +
        path +
        ' ), retrying (' +
        retry +
        ')...',
      );
      if (retry <= maxRetry) {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(PostRequest(path, body, retry));
          }, retryInterval);
        });
      }
    } else {
      log('Fetch Error:' + error);
      return false;
    }
  }
};

const GetRequest = async (path: String, retry: number = 0) => {
  try {
    const url = GenerateRequestUrl(path);
    log('Get request url: ' + url);
    const response = await fetch(url, {
      method: 'GET',
      keepalive: true,
    });
    // log("Get request debug: " + response.headers.get("content-type"))
    return await ProcessResponse(response);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      retry += 1;
      log(
        'GetRequest: Network request failed ( ' +
        path +
        ' ), retrying (' +
        retry +
        ')...',
      );
      if (retry <= maxRetry) {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(GetRequest(path, retry));
          }, retryInterval);
        });
      }
    } else {
      log('Fetch Error:' + error);
      return false;
    }
  }
};

const ProtectedPostRequest = async (
  path: String,
  body: Object,
  token: String,
  retry: number = 0,
) => {
  try {
    const url = GenerateRequestUrl(path);
    log('Protected Post request url: ' + url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    });
    return await ProcessResponse(response);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      retry += 1;
      log(
        'ProtectedPostRequest: Network request failed ( ' +
        path +
        ' ), retrying (' +
        retry +
        ')...',
      );
      if (retry <= maxRetry) {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(ProtectedPostRequest(path, body, token, retry));
          }, retryInterval);
        });
      }
    } else {
      log('Fetch Error:' + error);
      return false;
    }
  }
};

const ProtectedGetRequest = async (
  path: String,
  token: String,
  retry: number = 0,
) => {
  try {
    const url = GenerateRequestUrl(path);
    log('Protected Get request url: ' + url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return await ProcessResponse(response);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      retry += 1;
      log(
        'ProtectedGetRequest: Network request failed ( ' +
        path +
        ' ), retrying (' +
        retry +
        ')...',
      );
      if (retry <= maxRetry) {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(ProtectedGetRequest(path, token, retry));
          }, retryInterval);
        });
      }
    } else {
      log('Fetch Error:' + error);
      return false;
    }
  }
};

const ProtectedPutRequest = async (
  path: String,
  body: Object,
  token: String,
  retry: number = 0,
) => {
  try {
    const url = GenerateRequestUrl(path);
    log('Protected Put request url: ' + url);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    });
    return await ProcessResponse(response);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      retry += 1;
      log(
        'ProtectedPutRequest: Network request failed ( ' +
        path +
        ' ), retrying (' +
        retry +
        ')...',
      );
      if (retry <= maxRetry) {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(ProtectedPutRequest(path, body, token, retry));
          }, retryInterval);
        });
      }
    } else {
      log('Fetch Error:' + error);
      return false;
    }
  }
};

const ProtectedDeleteRequest = async (
  path: String,
  token: String,
  retry: number = 0,
) => {
  try {
    const url = GenerateRequestUrl(path);
    log('Protected Delete request url: ' + url);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return await ProcessResponse(response);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      retry += 1;
      log(
        'ProtectedDeleteRequest: Network request failed ( ' +
        path +
        ' ), retrying (' +
        retry +
        ')...',
      );
      if (retry <= maxRetry) {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(ProtectedDeleteRequest(path, token, retry));
          }, retryInterval);
        });
      }
    } else {
      log('Fetch Error:' + error);
      return false;
    }
  }
};

export const BigGetRequest = async (path: String) => {
  const count = await GetRequest('gets/count/' + path);
  const step = await GetRequest('gets/step');
  const concurrent = await GetRequest('gets/concurrent');
  let result: Array<any> = [];
  const pros = [];
  let i = 1;

  while (i <= count) {
    pros.push(GetRequest('gets/' + path + '/' + i));
    i += step;
  }

  i = 0;
  while (i < pros.length) {
    const pro = pros.slice(i, i + concurrent);
    const values = await Promise.all(pro);
    values.forEach(value => {
      result = result.concat(value);
    });
    i += concurrent;
  }
  return result;
};

export const UploadImage = async (path: String, image: Object) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    log('formData: ', JSON.stringify(formData));
    const response = await fetch(GenerateRequestUrl(path), {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    log(await ProcessResponse(response));
  } catch (error) {
    log('Save Image Error: ' + error);
  }
};

export const ProtectedUploadImage = async (
  path: string,
  image: Object,
  token: String,
) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    log('formData: ', JSON.stringify(formData));
    const response = await fetch(GenerateRequestUrl(path), {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    const res = await ProcessResponse(response);
    log(res);
    return res;
  } catch (error) {
    log('Save Image Error: ' + error);
  }
};

export const UploadIdentityImage = async (
  frontImage: Object,
  backImage: Object,
  token: String,
) => {
  try {
    const formData = new FormData();
    formData.append('front', {
      uri: frontImage.uri,
      type: frontImage.type,
      name: frontImage.fileName,
    });
    formData.append('back', {
      uri: backImage.uri,
      type: backImage.type,
      name: backImage.fileName,
    });
    log('formData: ', JSON.stringify(formData));
    const response = await fetch(GenerateRequestUrl('personal/identity/set'), {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    const res = await ProcessResponse(response);
    log(res);
    return res.msg == 'Completed';
  } catch (error) {
    console.log('Set Identity Image Error: ' + error);
    return false;
  }
};

export default {
  GetRequest,
  PostRequest,
  ProtectedGetRequest,
  ProtectedPostRequest,
  ProtectedPutRequest,
  ProtectedDeleteRequest,
};
