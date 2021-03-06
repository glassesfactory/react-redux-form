export default function omit(object, props) {
  if (object == null) {
    return {};
  }
  const newObject = Object.assign({}, object );

  if (typeof props === 'string') {
    delete newObject[props];
  } else {
    props.forEach((prop) => {
      delete newObject[prop];
    });
  }

  return newObject;
}
