const fs = require('node:fs/promises');
const path = require('node:path');

// const directions = ['dir1', 'dir2', 'dir3', 'dir4', 'dir5'];
// const files = ['Anna', 'Oleg', 'Ivan', 'Olga', 'Karina', 'Ewa', 'Stepan'];

// const worker = async () => {
//     try {
//         for (const direction of directions) {
//             await fs.mkdir(path.join(__dirname, direction), {recursive: true});
//         }
//
//         for (const file of files) {
//
//             await fs.writeFile(path.join(process.cwd(), `${file}.txt`), 'hej, tu jestes :) (: !');
//         }
//     } catch (e) {
//
//     }
// };

// const worker = async () => {
//     try {
//
//         const promises = directions.map(async (diretion, index) => {
//
//             await fs.mkdir(path.join(process.cwd(), diretion), {recursive: true});
//
//             await fs.writeFile(path.join(process.cwd(), diretion, `${files[index]}.js`), 'const user = {name: "Vasyl"}');
//
//         });
//
//         await Promise.allSettled(promises);
//
//         const readFiles = await fs.readdir(path.join(process.cwd()));
//
//         readFiles.map(async (file) => {
//             const stat = await fs.stat(path.join(process.cwd(), file));
//             const isFile = stat.isFile();
//
//             console.log(isFile);
//
//             if (isFile) {
//                 console.log(`File: ${file}`);
//             } else console.log(`Dir: ${file}`);
//         });
//
//     } catch (e) {
//         console.log(e.name);
//         console.log(e.message);
//     }
// };

// const worker = async () => {
//
//     const dirPromises = directions.map(async (dir) => {
//         await fs.mkdir(path.join(process.cwd(), dir));
//     });
//
//     const filePromises = files.map(async (file) => {
//         await fs.writeFile(path.join(process.cwd(), `${file}.txt`), file);
//     });
//
//     console.log('dirPromises:', dirPromises);
//     console.log('filePromises:', filePromises);
//
//     console.log(await Promise.allSettled([...dirPromises, ...filePromises]));
// };
//
// const readAll = async () => {
//     await worker().then();
//     const reads = await fs.readdir(path.join(process.cwd()));
//     console.log(reads);
//     await fs.rename(path.join(process.cwd(), 'file_3.txt'), path.join(process.cwd(), 'dir3', 'file_3.txt'));
// };
//
// readAll().then();

const directions = ['boys', 'girls'];
const files = ['Anna', 'Oleg', 'Ivan', 'Olga', 'Karina', 'Ewa', 'Stepan'];
const worker = async () => {
    try {
        await Promise.allSettled(directions.map(async (dir) => {
            await fs.mkdir(path.join(process.cwd(), dir));

            files.map(async (fileName) => {
                await fs.writeFile(path.join(
                        process.cwd(), dir, `${fileName}.js`),
                    `const ${fileName.toLocaleLowerCase()} = { name: '${fileName}',  gender: 'male' };`
                );
            });
        }));

    } catch (e) {
        console.log(e.message);
    }
};

const sort = async () => {

    await worker();
    const promiseBoys = await fs.readdir(path.join(process.cwd(), 'boys'));
    const promiseGirls = await fs.readdir(path.join(process.cwd(), 'girls'));

    await Promise.allSettled(promiseBoys.map(async (value) => {
        if (value) {

            const readFile = await fs.readFile(path.join(process.cwd(), 'boys', value), {encoding: 'utf-8'});
            const strings = readFile.split(' ');

            strings.map(async str => {

                if (str === "'female'") {
                    await fs.rename(path.join(process.cwd(), 'boys', value), path.join(process.cwd(), 'girls', value));
                }
            });
        }
    }));

    await Promise.allSettled(promiseGirls.map(async (value) => {

        const readFile = await fs.readFile(path.join(process.cwd(), 'girls', value), {encoding: 'utf-8'});
        const strings = readFile.split(' ');

        strings.map(async str => {

            if ( str === "'male'") {
                await fs.rename(path.join(process.cwd(), 'girls', value), path.join(process.cwd(), 'boys', value));
            }
        })
    }));

};

sort().then();