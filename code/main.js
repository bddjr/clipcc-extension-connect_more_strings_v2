const {api, type, Extension} = self["ClipCCExtension"];
const extension_id = 'bddjr.connect_more_strings_v2';
const category_id = extension_id + '.category';

module.exports = class extends Extension {
    onUninit(){
        api.removeCategory( category_id );
    }

    onInit(){
        api.addCategory({
            categoryId: category_id, 
            messageId: category_id,
            color: '#339900',
        });

        // 创建一个不能被程序触发的积木，点击它就会直接跳转到github仓库地址。
        api.addBlock({
            opcode: `${ category_id }.jumptogithub`,
            messageId: "Click here jump to github",
            categoryId: category_id,
            function: ()=>{
                window.open( "https://github.com/bddjr/clipcc-extension-connect_more_strings_v2" );
            },
        });

        // 循环创建积木
        let onInit_myMassageId = '[s0][s1]';
        let onInit_func_strs = "return`${a.s0}${a.s1}";
        for( let strs_len=2 ; strs_len<50 ; strs_len++ ){
            onInit_myMassageId += `[s${ strs_len }]`;
            onInit_func_strs += `\${a.s${ strs_len }}`;

            const myparam = {
                s0: {
                    type: type.ParameterType.STRING,
                    default: "1",
                }
            };
            for( let i=1 ; i<=strs_len ; i++ ){
                myparam[ "s"+ i ] = {
                    type: type.ParameterType.STRING,
                    default: `${ i+1 }`,
                };
            }

            api.addBlock({
                opcode: `${ category_id }.${ strs_len }`,
                type: type.BlockType.REPORTER,
                messageId: `Connect ${ strs_len +1 } strings ${ onInit_myMassageId }`,
                categoryId: category_id,
                param: myparam,
                // 这是安全的
                function: new Function( "a", onInit_func_strs + "`" ),
            });
        }
    }
};
