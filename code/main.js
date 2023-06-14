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

        // 循环添加模块
        for( let strs_len=3 ; strs_len<=50 ; strs_len++ ){
            const myopcode = `${category_id}.${strs_len}`;
            const myMassageId_strs = [`connect ${strs_len} strings [s0]`];
            const myparam = {
                s0: {
                    type: type.ParameterType.STRING,
                    default: " 0 ",
                }
            };
            // 拼接字符串用的列表
            const func_strs = ["a=>`${a.s0}"];
            // 开始堆叠
            for( let i=1 ; i < strs_len ; i++ ){
                myMassageId_strs.push( `[s${i}]` );
                myparam[ "s"+ i ] = {
                    type: type.ParameterType.STRING,
                    default: ` ${i} `,
                };
                func_strs.push( `\${a.s${i}}` );
            }
            func_strs.push( "`" );

            api.addBlock({
                opcode: myopcode ,
                type: type.BlockType.REPORTER ,
                messageId: myMassageId_strs.join("") ,
                categoryId: category_id ,
                param: myparam ,
                // 这是安全的
                function: eval( func_strs.join("") ),
            });
        }
    }
};
