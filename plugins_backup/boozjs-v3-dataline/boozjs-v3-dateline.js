export async function openBoozJsV3DateLine({dataQuJian,active,change}) {

  const {useCssLoad} = await import ('../require-css/index.js');

  useCssLoad(import.meta.url).loadCss(['assets/css/index.css']);

  const {useBoozJsV3DateLine} =await  import ('./lib/use-boozjs-v3-dateLine.js');
  useBoozJsV3DateLine({dataQuJian,active,change})
}

